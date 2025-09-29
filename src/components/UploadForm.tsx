import { useEffect, useState } from "react";
import { ImageRecognitionResponse, LogEntry } from "../types";
import { addLog } from "../utils/localStorageLog";

const ENDPOINT = "http://ec2-54-81-142-28.compute-1.amazonaws.com:8080/predict";

export default function UploadForm() {
  const [invert, setInvert] = useState<"true" | "false">("false");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");
  const [result, setResult] = useState<ImageRecognitionResponse | null>(null);
  const [dims, setDims] = useState<{w:number; h:number} | null>(null);

  // vista previa + lectura de dimensiones
  useEffect(() => {
    if (!file) {
      setPreview(null);
      setDims(null);
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setDims({ w: img.width, h: img.height });
    };
    img.src = url;
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] || null;
    setFile(f);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);

    if (!file) {
      setStatus("Sube una imagen primero.");
      return;
    }
    if (!dims || dims.w !== 28 || dims.h !== 28) {
      setStatus("La imagen debe ser exactamente 28x28 píxeles. Ajusta el tamaño e inténtalo de nuevo.");
      return;
    }

    setStatus("Enviando...");
    const formData = new FormData();
    formData.append("invert", invert);
    formData.append("image", file);

    const logBase: LogEntry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      request: { invert, filename: file.name },
    };

    try {
      const res = await fetch(ENDPOINT, { method: "POST", body: formData });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = (await res.json()) as ImageRecognitionResponse;
      setResult(data);
      setStatus("Listo ✅");

      addLog({ ...logBase, response: data });
    } catch (err: any) {
      const msg = `Error: ${err?.message || "no se pudo conectar"}`;
      setStatus(msg);
      addLog({ ...logBase, error: msg });
    }
  }

  return (
    <section className="bg-white rounded-xl p-4 shadow">
      <h1 className="text-xl font-semibold mb-2">Subir dígito manuscrito</h1>
      <p className="text-sm text-gray-600 mb-4">
        Imagen en blanco/negro (28×28). Campo <code>invert</code>: "true" si el número está <b>blanco</b> sobre fondo <b>negro</b>,
        "false" si está <b>negro</b> sobre <b>blanco</b>.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-2 sm:grid-cols-2">
          <label className="flex flex-col gap-1">
            <span className="text-sm">Invert</span>
            <select
              value={invert}
              onChange={(e) => setInvert(e.target.value as "true" | "false")}
              className="border rounded p-2"
            >
              <option value="false">false (negro sobre blanco)</option>
              <option value="true">true (blanco sobre negro)</option>
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm">Imagen (PNG/JPG) 28×28</span>
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="border rounded p-2"
            />
          </label>
        </div>

        {preview && (
          <div className="flex items-center gap-4">
            <img
              src={preview}
              alt="preview"
              className="border rounded w-28 h-28 object-contain bg-white"
            />
            <div className="text-sm text-gray-600">
              <p>Dimensiones detectadas: {dims?.w ?? "?"}×{dims?.h ?? "?"} px</p>
              {dims && (dims.w !== 28 || dims.h !== 28) && (
                <p className="text-amber-600 mt-1">
                  ⚠️ Debe ser exactamente 28×28 para poder enviar.
                </p>
              )}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
          disabled={!file || !dims || dims.w !== 28 || dims.h !== 28}
        >
          Enviar
        </button>
      </form>

      <div className="mt-4 text-sm">
        <p className="mb-1">Estado: {status || "—"}</p>
        {result && (
          <div className="mt-2 border rounded p-3 bg-gray-50">
            <p><b>prediction</b>: {result.prediction}</p>
            <p><b>accuracy</b>: {result.accuracy}</p>
            <p><b>process_time</b>: {result.process_time}</p>
          </div>
        )}
      </div>
    </section>
  );
}

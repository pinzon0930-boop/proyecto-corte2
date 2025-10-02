// Importamos useEffect y useState de React para manejar estados y efectos.
// - useState: guardar valores (archivo, estado, resultado, etc).
// - useEffect: ejecutar algo cuando cambia una variable (ej: vista previa de imagen).
import { useEffect, useState } from "react";

// Importamos los tipos que definimos (estructura de respuesta y log).
import { ImageRecognitionResponse, LogEntry } from "../types";

// Importamos la función para guardar un registro en LocalStorage.
import { addLog } from "../utils/localStorageLog";

// Guardamos en una constante la URL del servidor donde se hará la petición.
const ENDPOINT = "http://ec2-54-81-142-28.compute-1.amazonaws.com:8080/predict";

// Definimos el componente UploadForm que muestra el formulario principal.
export default function UploadForm() {
  // Estado para el campo "invert" (string "true" o "false").
  const [invert, setInvert] = useState<"true" | "false">("false");

  // Estado para el archivo de imagen que selecciona el usuario.
  const [file, setFile] = useState<File | null>(null);

  // Estado para la URL de vista previa (imagen en miniatura antes de enviar).
  const [preview, setPreview] = useState<string | null>(null);

  // Estado para mostrar mensajes de estado (ej: "enviando", "listo", "error").
  const [status, setStatus] = useState<string>("");

  // Estado para guardar la respuesta del servidor (prediction, accuracy, etc).
  const [result, setResult] = useState<ImageRecognitionResponse | null>(null);

  // Estado para mostrar advertencias si la imagen no es de 28x28.
  const [dimWarning, setDimWarning] = useState<string>("");

  // useEffect: cada vez que cambia el archivo, creamos una URL temporal para mostrar la vista previa.
  // También borramos la URL al cambiar de archivo para no desperdiciar memoria.
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url); // limpiamos cuando se cambia el archivo
  }, [file]);

  // Función que revisa las dimensiones de la imagen (ancho y alto).
  // Si no es de 28x28, muestra una advertencia, pero no bloquea el envío.
  async function checkDimensions(f: File) {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => {
        if (img.width !== 28 || img.height !== 28) {
          setDimWarning(`La imagen es ${img.width}x${img.height}. Sugerido: 28x28.`);
        } else {
          setDimWarning("");
        }
        resolve();
      };
      img.onerror = () => resolve();
      img.src = URL.createObjectURL(f);
    });
  }

  // Función que se ejecuta cuando el usuario selecciona un archivo.
  // Guarda el archivo en el estado y revisa dimensiones.
  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (f) await checkDimensions(f);
  }

  // Función que maneja el envío del formulario.
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // evita que la página se recargue
    setResult(null); // resetea el resultado anterior

    // Validación: si no hay archivo, mostramos mensaje y no enviamos nada.
    if (!file) {
      setStatus("Sube una imagen primero.");
      return;
    }

    setStatus("Enviando..."); // mostramos mensaje de "enviando"

    // Creamos un objeto FormData para enviar datos al servidor en formato multipart/form-data.
    const formData = new FormData();
    formData.append("invert", invert); // añadimos el campo "invert" como string
    formData.append("image", file);    // añadimos el archivo de imagen

    // Creamos un registro base para el historial con id, fecha y datos enviados.
    const logBase: LogEntry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      request: { invert, filename: file.name },
    };

    try {
      // Enviamos la petición al servidor con fetch.
      // Método POST, cuerpo es el FormData (sin usar Axios).
      const res = await fetch(ENDPOINT, { method: "POST", body: formData });

      // Si el servidor responde con error (ej: 500, 404), lanzamos excepción.
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      // Convertimos la respuesta en JSON (contendrá prediction, accuracy, process_time).
      const data = (await res.json()) as ImageRecognitionResponse;

      // Guardamos el resultado en el estado para mostrarlo en pantalla.
      setResult(data);
      setStatus("Listo "); // mensaje de éxito

      // Guardamos el registro con la respuesta en LocalStorage.
      addLog({ ...logBase, response: data });
    } catch (err: any) {
      // Si algo falla (ej: servidor caído, CORS, error de red),
      // mostramos el error en pantalla y también lo guardamos en el historial.
      const msg = `Error: ${err?.message || "no se pudo conectar"}`;
      setStatus(msg);
      addLog({ ...logBase, error: msg });
    }
  }

  return (
    // Contenedor principal con fondo blanco, borde redondeado y sombra.
    <section className="bg-white rounded-xl p-4 shadow">
      <h1 className="text-xl font-semibold mb-2">Subir dígito manuscrito</h1>

      {/* Explicación corta de cómo funciona el campo "invert". */}
      <p className="text-sm text-gray-600 mb-4">
        <code>invertir</code>: "true" si el número es <b>blanco</b> con fondo <b>negro</b>.
        "false" si es <b>negro</b> con fondo <b>blanco</b>.
      </p>

      {/* Formulario principal */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {/* Selector para elegir "invert" true/false */}
          <label className="flex flex-col gap-1">
            <span className="text-sm">Invertir</span>
            <select
              value={invert}
              onChange={(e) => setInvert(e.target.value as "true" | "false")}
              className="border rounded p-2"
            >
              <option value="false">false (negro sobre blanco)</option>
              <option value="true">true (blanco sobre negro)</option>
            </select>
          </label>

          {/* Input para seleccionar el archivo de imagen */}
          <label className="flex flex-col gap-1">
            <span className="text-sm">Imagen (PNG/JPG)</span>
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="border rounded p-2"
            />
          </label>
        </div>

        {/* Si hay imagen seleccionada, mostramos la vista previa */}
        {preview && (
          <div className="flex items-center gap-4">
            <img
              src={preview}
              alt="preview"
              className="border rounded w-28 h-28 object-contain bg-white"
            />
            <div className="text-sm text-gray-600">
              <p>Vista previa.</p>
              {/* Si la imagen no es 28x28, mostramos una advertencia */}
              {dimWarning && <p className="text-amber-600 mt-1">{dimWarning}</p>}
            </div>
          </div>
        )}

        {/* Botón para enviar el formulario */}
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
        >
          Enviar
        </button>
      </form>

      {/* Sección de estado y resultado */}
      <div className="mt-4 text-sm">
        {/* Muestra el estado actual (ej: enviando, listo, error) */}
        <p className="mb-1">Estado: {status || "—"}</p>

        {/* Si hay resultado del servidor, lo mostramos en un cuadro */}
        {result && (
          <div className="mt-2 border rounded p-3 bg-gray-50">
            <p><b>Predicción</b>: {result.prediction}</p>
            <p><b>Que tan seguro es</b>: {result.accuracy}</p>
            <p><b>Tiempo de proceso</b>: {result.process_time}</p>
          </div>
        )}
      </div>
    </section>
  );
}

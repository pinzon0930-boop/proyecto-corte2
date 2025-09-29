import { useEffect, useState } from "react";
import { LogEntry } from "../types";
import { clearLog, readLog } from "../utils/localStorageLog";

export default function HistoryPage() {
  const [items, setItems] = useState<LogEntry[]>([]);

  useEffect(() => {
    setItems(readLog());
  }, []);

  function onClear() {
    clearLog();
    setItems([]);
  }

  return (
    <section className="bg-white rounded-xl p-4 shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Historial de peticiones</h2>
        <button
          onClick={onClear}
          className="text-sm bg-gray-200 hover:bg-gray-300 rounded px-3 py-1"
        >
          Limpiar
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-gray-600 mt-3">No hay registros aún.</p>
      ) : (
        <ul className="mt-3 space-y-3">
          {items.map((it) => (
            <li key={it.id} className="border rounded p-3">
              <div className="text-xs text-gray-500">
                {new Date(it.timestamp).toLocaleString()}
              </div>
              <div className="text-sm">
                <p><b>invert:</b> {it.request.invert} | <b>archivo:</b> {it.request.filename}</p>
                {it.response ? (
                  <p className="mt-1">
                    <b>prediction:</b> {it.response.prediction} |
                    <b> accuracy:</b> {it.response.accuracy} |
                    <b> process_time:</b> {it.response.process_time}
                  </p>
                ) : it.error ? (
                  <p className="mt-1 text-red-600">{it.error}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

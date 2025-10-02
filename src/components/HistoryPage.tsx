// Importamos useEffect y useState para manejar estado y efectos en el componente.
import { useEffect, useState } from "react";
// Importamos el tipo LogEntry para tipar los elementos del historial.
import { LogEntry } from "../types";
// Importamos funciones para leer y limpiar el historial desde LocalStorage.
import { clearLog, readLog } from "../utils/localStorageLog";

// Definimos el componente de la página de historial.
export default function HistoryPage() {
  // Estado local que guarda la lista de registros (cada uno es un LogEntry).
  const [items, setItems] = useState<LogEntry[]>([]);

  // useEffect se ejecuta al montar el componente.
  // Aquí leemos el historial de LocalStorage y lo guardamos en el estado.
  useEffect(() => {
    setItems(readLog());
  }, []); // [] significa que solo corre una vez al montar.

  // Función para limpiar el historial completo.
  // Llama a clearLog() y luego vacía el estado para refrescar la UI.
  function onClear() {
    clearLog();
    setItems([]);
  }

  // Render del componente (lo que se ve en la pantalla).
  return (
    // Contenedor con estilos básicos (fondo blanco, bordes redondeados y sombra).
    <section className="bg-white rounded-xl p-4 shadow">
      {/* Encabezado con el título y un botón "Limpiar" a la derecha */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Historial de peticiones</h2>
        <button
          onClick={onClear} // Al hacer clic, se borran los registros
          className="text-sm bg-gray-200 hover:bg-gray-300 rounded px-3 py-1"
        >
          Limpiar
        </button>
      </div>

      {/* Si no hay registros, mostramos un texto simple.
          Si sí hay, mostramos la lista como <ul> con <li> por cada item. */}
      {items.length === 0 ? (
        // Mensaje cuando el historial está vacío
        <p className="text-sm text-gray-600 mt-3">No hay registros aún.</p>
      ) : (
        // Lista de registros (el más nuevo va primero porque así lo guardamos)
        <ul className="mt-3 space-y-3">
          {items.map((it) => (
            // Cada <li> es una tarjeta con la info del registro
            <li key={it.id} className="border rounded p-3">
              {/* Fecha/hora del registro en formato local legible */}
              <div className="text-xs text-gray-500">
                {new Date(it.timestamp).toLocaleString()}
              </div>

              {/* Cuerpo con los datos de la petición y resultado/error */}
              <div className="text-sm">
                {/* Mostramos qué se envió: invert y nombre del archivo */}
                <p>
                  <b>invertir:</b> {it.request.invert} | <b>archivo:</b> {it.request.filename}
                </p>

                {/* Si hay respuesta, mostramos prediction/accuracy/process_time.
                    Si no, y hay error, mostramos el error en rojo. */}
                {it.response ? (
                  <p className="mt-1">
                    <b>Predicción:</b> {it.response.prediction} |
                    <b>Que tan seguro es:</b> {it.response.accuracy} |
                    <b>Tiempo de proceso:</b> {it.response.process_time}
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

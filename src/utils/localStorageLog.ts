// Importamos el tipo LogEntry, que es la estructura de cada registro del historial.
// Esto asegura que los datos que guardemos en LocalStorage sigan el mismo formato.
import { LogEntry } from "../types";

// Definimos una constante con la clave que usaremos en el LocalStorage.
// Esta será la "etiqueta" donde se guardarán todos los registros.
const KEY = "requests_log_v1"; 

// Esta función lee el historial completo desde el LocalStorage.
// Devuelve un arreglo de LogEntry si existe, o un arreglo vacío si no hay nada.
// También tiene un try/catch para evitar errores si el contenido está dañado.
export function readLog(): LogEntry[] {
  try {
    const raw = localStorage.getItem(KEY); // obtenemos la cadena guardada
    return raw ? (JSON.parse(raw) as LogEntry[]) : []; // convertimos a objeto o devolvemos []
  } catch {
    return []; // si algo falla, devolvemos lista vacía
  }
}

// Esta función sobrescribe todo el historial en LocalStorage.
// Convierte el arreglo de LogEntry en una cadena JSON y lo guarda.
export function writeLog(data: LogEntry[]) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

// Esta función agrega un nuevo registro al historial.
// Primero lee todo lo que ya existe, agrega el nuevo al inicio,
// y finalmente vuelve a escribir el arreglo completo en LocalStorage.
export function addLog(entry: LogEntry) {
  const all = readLog();   // leemos historial actual
  all.unshift(entry);      // agregamos al principio para que lo nuevo aparezca primero
  writeLog(all);           // guardamos todo de nuevo
}

// Esta función borra por completo el historial.
// Básicamente sobrescribe la clave con un arreglo vacío.
export function clearLog() {
  writeLog([]);
}


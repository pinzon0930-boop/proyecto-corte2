// Funciones simples para manejar el historial en LocalStorage
import { LogEntry } from "../types";

const KEY = "requests_log_v1"; //clave de almacenamiento

// Lee el historial (o arreglo vacío)
export function readLog(): LogEntry[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as LogEntry[]) : [];
  } catch {
    return [];
  }
}

// Escribe el historial completo
export function writeLog(data: LogEntry[]) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

// Agrega un nuevo registro (al inicio)
export function addLog(entry: LogEntry) {
  const all = readLog();
  all.unshift(entry); // más nuevo primero
  writeLog(all);
}

// Borra todo el historial
export function clearLog() {
  writeLog([]);
}

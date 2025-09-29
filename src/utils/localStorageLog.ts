import { LogEntry } from "../types";

const KEY = "requests_log_v1";

export function readLog(): LogEntry[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as LogEntry[]) : [];
  } catch {
    return [];
  }
}

export function writeLog(data: LogEntry[]) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function addLog(entry: LogEntry) {
  const all = readLog();
  all.unshift(entry); // más nuevo primero
  writeLog(all);
}

export function clearLog() {
  writeLog([]);
}

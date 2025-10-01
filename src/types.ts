// Forma de la respuesta de la API
export interface ImageRecognitionResponse {
  process_time: string;
  prediction: number;
  accuracy: number;
}

// Estructura de un item guardado en el historial
export interface LogEntry {
  id: string;
  timestamp: string; // fecha/hora ISO
  request: {
    invert: "true" | "false";
    filename: string;
  };
  response?: ImageRecognitionResponse;// si salió bien
  error?: string;// si falló
}

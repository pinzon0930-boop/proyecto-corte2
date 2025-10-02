// Definimos tipos (interfaces) que usaremos en toda la app

// Este tipo representa la respuesta que devuelve la API
export interface ImageRecognitionResponse {
  process_time: string;   // tiempo de procesamiento (texto)
  prediction: number;     // número detectado
  accuracy: number;       // porcentaje de acierto
}

// Este tipo representa un registro guardado en el historial
export interface LogEntry {
  id: string;             // identificador único
  timestamp: string;      // fecha/hora en formato ISO
  request: {              // lo que se envió a la API
    invert: "true" | "false"; // valor de invert (texto)
    filename: string;         // nombre del archivo subido
  };
  response?: ImageRecognitionResponse; // respuesta si fue éxito
  error?: string;                      // error si falló
}


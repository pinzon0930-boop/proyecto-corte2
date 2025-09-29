export interface ImageRecognitionResponse {
  process_time: string;
  prediction: number;
  accuracy: number;
}

export interface LogEntry {
  id: string;
  timestamp: string; // ISO
  request: {
    invert: "true" | "false";
    filename: string;
  };
  response?: ImageRecognitionResponse;
  error?: string;
}

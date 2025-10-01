// Define las páginas y la barra de navegación
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import UploadForm from "./components/UploadForm";
import HistoryPage from "./components/HistoryPage";

export default function App() {
  return (
    <div className="min-h-screen">
      <NavBar /> {/* menú simple */}
      <div className="mx-auto max-w-3xl p-4">
        <Routes>
          <Route path="/" element={<UploadForm />} /> {/* página principal */}
          <Route path="/history" element={<HistoryPage />} /> {/* historial */}
        </Routes>
      </div>
    </div>
  );
}

import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import UploadForm from "./components/UploadForm";
import HistoryPage from "./components/HistoryPage";

export default function App() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="mx-auto max-w-3xl p-4">
        <Routes>
          <Route path="/" element={<UploadForm />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </div>
    </div>
  );
}

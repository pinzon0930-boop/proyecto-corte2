// Importamos las herramientas de enrutamiento (Routes y Route)
// que nos permiten definir las diferentes páginas de la aplicación.
import { Routes, Route } from "react-router-dom";

// Importamos la barra de navegación, que aparece en todas las páginas.
import NavBar from "./components/NavBar";

// Importamos el componente que muestra el formulario de subida de imágenes.
import UploadForm from "./components/UploadForm";

// Importamos el componente que muestra el historial de peticiones guardadas en LocalStorage.
import HistoryPage from "./components/HistoryPage";

// Definimos el componente principal de la aplicación.
export default function App() {
  return (
    // Un contenedor principal que ocupa toda la altura de la pantalla
    // y tiene un color de fondo gris claro gracias a Tailwind.
    <div className="min-h-screen bg-gray-100">

      {/* Aquí colocamos la barra de navegación.
          Siempre estará visible en todas las páginas (Inicio e Historial). */}
      <NavBar />

      {/* Este div sirve como área principal de contenido.
          Usamos clases de Tailwind para centrarlo y darle padding. */}
      <div className="mx-auto max-w-3xl p-4">
        
        {/* Aquí definimos las rutas de la app:
            - "/" mostrará el formulario de subida.
            - "/history" mostrará el historial de peticiones. */}
        <Routes>
          {/* Ruta para la página principal con el formulario */}
          <Route path="/" element={<UploadForm />} />

          {/* Ruta para la página del historial */}
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </div>
    </div>
  );
}

// Importamos Link y useLocation de react-router-dom.
// - Link sirve para crear enlaces entre páginas sin recargar el navegador.
// - useLocation nos permite saber en qué ruta estamos (ej: "/" o "/history").
import { Link, useLocation } from "react-router-dom";

// Definimos el componente NavBar que será mostrado en la parte superior.
export default function NavBar() {
  // Usamos useLocation para obtener información de la ruta actual.
  // Esto lo usamos para resaltar el botón activo en el menú.
  const { pathname } = useLocation();

  return (
    // Un header (encabezado) con fondo blanco y una sombra ligera.
    <header className="bg-white shadow">
      
      {/* Dentro del header, colocamos un nav (barra de navegación).
          Usamos Tailwind para centrar, espaciar y dar estilo. */}
      <nav className="mx-auto max-w-3xl flex items-center gap-4 p-4 text-sm">
        
        {/* Enlace a la página principal ("/").
            Si la ruta actual es "/", se pinta con fondo azul y texto blanco.
            Si no lo es, se muestra normal con hover gris. */}
        <Link
          to="/"
          className={`px-3 py-1 rounded ${
            pathname === "/" ? "bg-blue-600 text-white" : "hover:bg-gray-100"
          }`}
        >
          Inicio
        </Link>

        {/* Enlace a la página de historial ("/history").
            Igual que arriba: si estamos en esa ruta, se marca en azul. */}
        <Link
          to="/history"
          className={`px-3 py-1 rounded ${
            pathname === "/history" ? "bg-blue-600 text-white" : "hover:bg-gray-100"
          }`}
        >
          Historial
        </Link>

        {/* Texto fijo al lado derecho de la barra.
            Simplemente muestra el nombre de la app. */}
        <span className="ml-auto text-gray-500">
          Reconocimiento de dígitos
        </span>
      </nav>
    </header>
  );
}

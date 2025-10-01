// Navegación sencilla entre Inicio e Historial
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const { pathname } = useLocation(); // saber ruta actual
  return (
    <header className="bg-white shadow">
      <nav className="mx-auto max-w-3xl flex items-center gap-4 p-4 text-sm">
        {/* Link a Inicio */}
        <Link
          to="/"
          className={`px-3 py-1 rounded ${pathname === "/" ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
        >
          Inicio
        </Link>

        {/* Link a Historial */}
        <Link
          to="/history"
          className={`px-3 py-1 rounded ${pathname === "/history" ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
        >
          Historial
        </Link>

         {/* texto a la derecha */}
        <span className="ml-auto text-gray-500">Reconocimiento de dígitos</span>
      </nav>
    </header>
  );
}

// Importamos React, necesario para trabajar con componentes y JSX.
import React from "react";

// Importamos ReactDOM, que se encarga de renderizar la aplicación en el navegador.
import ReactDOM from "react-dom/client";

// Importamos BrowserRouter para habilitar el enrutamiento con rutas (/, /history, etc.).
import { BrowserRouter } from "react-router-dom";

// Importamos el componente principal de la aplicación (App.tsx).
import App from "./App";

// Importamos los estilos globales, donde tenemos configurado TailwindCSS.
import "./index.css";

// Aquí le decimos a React dónde debe renderizar nuestra aplicación.
// Se selecciona el elemento con id="root" en index.html y ahí se monta todo.
ReactDOM.createRoot(document.getElementById("root")!).render(
  // React.StrictMode es una herramienta que ayuda a encontrar problemas en desarrollo.
  // No afecta en producción, pero muestra advertencias útiles en consola.
  <React.StrictMode>
    {/* BrowserRouter envuelve toda la app para permitir navegación con rutas */}
    <BrowserRouter>
      {/* Renderizamos el componente principal de la app */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);


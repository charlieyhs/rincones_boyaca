import { useEffect } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router";
import Mapa from "./components/maps/Mapa"
import PlanesPage from "./pages/PlanesPage";
import PlanDetallePage from "./pages/PlanDetallePage";
import SitioDetallePage from "./pages/SitioDetallePage";
import NoEncontradoPage from "./pages/NoEncontradoPage";
import './app.css'

/** Al cambiar de página, vuelve al inicio del scroll. */
function ScrollArriba() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="app">
      <ScrollArriba />
      <header className="app-header">
        <Link to="/" className="app-header-titulo">Rincones Boyacá</Link>
        <p className="app-header-subtitulo">
          Descubre la belleza de nuestros paisajes
        </p>
        <nav className="app-nav" aria-label="Secciones">
          <NavLink to="/" end>Explorar mapa</NavLink>
          <NavLink to="/planes">Planes turísticos</NavLink>
        </nav>
      </header>

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Mapa />} />
          <Route path="/planes" element={<PlanesPage />} />
          <Route path="/planes/:slug" element={<PlanDetallePage />} />
          <Route path="/sitios/:id" element={<SitioDetallePage />} />
          <Route path="*" element={<NoEncontradoPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

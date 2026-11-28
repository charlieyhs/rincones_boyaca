import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import Mapa from "./components/maps/Mapa"
import PlanesPage from "./pages/PlanesPage";
import PlanDetallePage from "./pages/PlanDetallePage";
import SitioDetallePage from "./pages/SitioDetallePage";
import NoEncontradoPage from "./pages/NoEncontradoPage";
import Footer from "./components/layout/Footer";
import MenuSuperior from "./components/layout/MenuSuperior";
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
      <MenuSuperior />

      <main id="contenido" className="app-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Mapa />} />
          <Route path="/planes" element={<PlanesPage />} />
          <Route path="/planes/:slug" element={<PlanDetallePage />} />
          <Route path="/sitios/:id" element={<SitioDetallePage />} />
          <Route path="*" element={<NoEncontradoPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;

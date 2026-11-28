import { Link } from "react-router";
import { GitHub } from "@mui/icons-material";

const REPOSITORIO = "https://github.com/charlieyhs/rincones_boyaca";

const CREDITOS_MAPA = [
  { nombre: "Leaflet", url: "https://leafletjs.com/" },
  { nombre: "OpenStreetMap", url: "https://www.openstreetmap.org/copyright" },
  { nombre: "Esri", url: "https://www.esri.com/" },
  { nombre: "CARTO", url: "https://carto.com/attributions" },
];

const anioActual = new Date().getFullYear();

const Footer = () => (
  <footer className="app-footer">
    <div className="app-footer-contenido">
      <section className="app-footer-marca">
        <Link to="/" className="app-footer-titulo">Rincones Boyacá</Link>
        <p>
          Sitios turísticos y planes para recorrer Boyacá, Colombia, desde un
          mapa interactivo.
        </p>
      </section>

      <nav className="app-footer-columna" aria-label="Secciones del pie de página">
        <h2>Explora</h2>
        <ul>
          <li><Link to="/">Mapa de sitios</Link></li>
          <li><Link to="/planes">Planes turísticos</Link></li>
        </ul>
      </nav>

      <section className="app-footer-columna">
        <h2>Créditos del mapa</h2>
        <ul>
          {CREDITOS_MAPA.map(({ nombre, url }) => (
            <li key={nombre}>
              <a href={url} target="_blank" rel="noopener noreferrer">{nombre}</a>
            </li>
          ))}
        </ul>
      </section>
    </div>

    <div className="app-footer-inferior">
      <p>© {anioActual} Rincones Boyacá</p>
      <a
        href={REPOSITORIO}
        target="_blank"
        rel="noopener noreferrer"
        className="app-footer-repo"
      >
        <GitHub fontSize="small" />
        Código en GitHub
      </a>
    </div>
  </footer>
);

export default Footer;

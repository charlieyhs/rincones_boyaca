import { useEffect } from "react";
import { useMap } from "react-leaflet";

const ZOOM_SITIO = 16;

/**
 * Centra el mapa en un sitio. `enfoque` es { sitio, id }: el id cambia en cada
 * solicitud para que pedir el mismo sitio dos veces vuelva a centrar el mapa.
 */
const EnfocarSitio = ({ enfoque }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(enfoque.sitio.coords, ZOOM_SITIO);
  }, [enfoque, map]);

  return null;
};

export default EnfocarSitio;

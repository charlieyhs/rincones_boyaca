import { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";

/**
 * Encuadra todas las paradas. Leaflet mide el contenedor al montarse; si en ese
 * momento aún no tiene su tamaño final, fitBounds calcula un zoom máximo. Por eso
 * se vuelve a encuadrar cada vez que el contenedor cambia de tamaño.
 */
const AjustarRecorrido = ({ coords }) => {
  const map = useMap();

  useEffect(() => {
    if (coords.length === 0) return undefined;
    const bounds = L.latLngBounds(coords);
    const encuadrar = () => {
      map.invalidateSize();
      map.fitBounds(bounds, { padding: [40, 40] });
    };
    encuadrar();
    const observer = new ResizeObserver(encuadrar);
    observer.observe(map.getContainer());
    return () => observer.disconnect();
  }, [coords, map]);

  return null;
};

export default AjustarRecorrido;

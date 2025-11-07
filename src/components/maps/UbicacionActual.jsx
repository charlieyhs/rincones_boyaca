import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from 'leaflet';

const UbicacionActual = () => {
  const map = useMap();

  useEffect(() => {
    const latlng = { lat: 5.6513754, lng: -74.1571872 };

    L.marker(latlng)
        .addTo(map)
        .bindPopup("📍 Inicias aquí")
        .openPopup();

    map.flyTo(latlng, 12);

  }, [map]);

  return null;
}

export default UbicacionActual;
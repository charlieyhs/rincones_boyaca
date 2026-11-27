import { useMemo } from "react";
import { Link } from "react-router";
import { MapContainer, Marker, Polyline, Popup, TileLayer, ZoomControl } from "react-leaflet";
import AjustarRecorrido from "./AjustarRecorrido";
import { marcadorNumerado } from "../../utils/mapsUtil";
import { VERDE_BOYACA } from "../../constants";

/**
 * Mapa del recorrido de un plan: paradas numeradas en orden y una línea
 * punteada entre ellas. La línea es el orden del recorrido, no la vía real.
 */
const MapaPlan = ({ paradas }) => {
  const trazo = useMemo(() => paradas.map((p) => p.sitio.coords), [paradas]);

  return (
    <MapContainer
      center={trazo[0] ?? [5.65, -74.15]}
      zoom={12}
      zoomControl={false}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%", borderRadius: 12 }}
    >
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
        attribution="&copy; Esri, HERE, Garmin, OpenStreetMap contributors"
      />
      <ZoomControl position="topright" />
      <AjustarRecorrido coords={trazo} />

      <Polyline
        positions={trazo}
        pathOptions={{ color: VERDE_BOYACA, weight: 4, opacity: 0.8, dashArray: "8 10" }}
      />

      {paradas.map((parada, i) => (
        <Marker
          key={`${parada.sitioId}-${i}`}
          position={parada.sitio.coords}
          icon={marcadorNumerado(i + 1, VERDE_BOYACA)}
        >
          <Popup>
            <div style={{ padding: 12, minWidth: 160 }}>
              <strong>{i + 1}. {parada.sitio.nombre}</strong>
              <p style={{ margin: "4px 0 8px", fontSize: 12 }}>
                Día {parada.dia} · {parada.duracion}
              </p>
              <Link to={`/sitios/${parada.sitio.id}`}>Ver ficha del sitio →</Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapaPlan;

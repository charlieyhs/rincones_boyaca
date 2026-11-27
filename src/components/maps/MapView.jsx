import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import { colorMarcadorPosicion, marcadorPosicionActual } from '../../utils/mapsUtil';
import MarcadoresVisibles from './MarcadoresVisibles';
import PopupCard from './PopupCard';
import styles from './mapa.module.css';
import MapFooter from './MapFooter';
import { useState } from 'react';
import UbicacionActual from './UbicacionActual';
import EnfocarSitio from './EnfocarSitio';
import { useMediaQuery, useTheme } from '@mui/material';

const TILE_STYLES = {
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: '&copy; Esri, Maxar, Earthstar Geographics, and the GIS User Community'
  },
  street: {
    url: "https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team'
  },
  smooth: {
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attribution: '© OpenStreetMap contributors © CARTO'
  }
};

const MapView = ({ sitios, onOpenInfo, enfoque }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [mapStyle, setMapStyle] = useState('satellite');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // Dispositivos táctiles (celular, tablet o celular en horizontal): abrir el detalle
  // directamente en vez del popup. En escritorio (puntero fino) se muestra el popup.
  const esTactil = useMediaQuery("(pointer: coarse)");
  const ejecutarOpenInfo = isMobile || esTactil;

  return (
    <div className={styles.mapa_wrapper}>
      <MapContainer
        center={[5.6513754, -74.1571872]}
        zoom={13}
        zoomControl={false}
      >
        <TileLayer {...TILE_STYLES[mapStyle]} />
        <ZoomControl position="topright" />
        <MarcadoresVisibles sitios={sitios} />
        {enfoque && <EnfocarSitio enfoque={enfoque} />}

        {sitios.map((sitio) => (
          <Marker
            key={sitio.id}
            position={sitio.coords}
            icon={colorMarcadorPosicion(sitio.categoria)}
            eventHandlers={{
              click: () => {
                if (ejecutarOpenInfo) {
                  onOpenInfo(sitio);
                }
              },
            }}
          >
            {!ejecutarOpenInfo && (
              <Popup maxWidth={300} className="custom-popup">
                <PopupCard sitio={sitio} onOpenInfo={() => onOpenInfo(sitio)} />
              </Popup>
            )}
          </Marker>
        ))}
        {/* Marcador del usuario */}
        {userLocation && (
          <>
            <UbicacionActual position={userLocation} />
            <Marker
              position={userLocation}
              icon={marcadorPosicionActual()}
            />
          </>
        )}
      </MapContainer>

      <MapFooter
          mapStyle={mapStyle}
          setMapStyle={setMapStyle}
          setUserLocation={setUserLocation}
        />
    </div>
  );
};

export default MapView;

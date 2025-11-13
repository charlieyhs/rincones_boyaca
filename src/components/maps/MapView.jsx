import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import { colorMarcadorPosicion, marcadorPosicionActual } from '../../utils/mapsUtil';
import MarcadoresVisibles from './MarcadoresVisibles';
import PopupCard from './PopupCard';
import styles from './mapa.module.css';
import PropTypes from 'prop-types';
import MapFooter from './MapFooter';
import { useState } from 'react';
import UbicacionActual from './UbicacionActual';

const TILE_STYLES = {
  satellite: {
    url: "https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg",
    attribution: '&copy; Stadia Maps'
  },
  street: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; OpenStreetMap'
  },
  smooth: {
    url: "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
    attribution: '&copy; Stadia Maps'
  }
};

const MapView = ({ sitios, onOpenInfo }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [mapStyle, setMapStyle] = useState('satellite');

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

        {sitios.map((sitio) => (
          <Marker
            key={sitio.id}
            position={sitio.coords}
            icon={colorMarcadorPosicion(sitio.categoria)}
          >
            <Popup maxWidth={300} className="custom-popup">
              <PopupCard sitio={sitio} onOpenInfo={() => onOpenInfo(sitio)} />
            </Popup>
          </Marker>
        ))}
        {/* Marcador del usuario */}
        {userLocation && (
          <>
            <UbicacionActual position={userLocation} />
            <Marker
              position={userLocation}
              icon={marcadorPosicionActual()}
            >
              <Popup>Estás aquí</Popup>
            </Marker>
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

MapView.propTypes = {
  sitios: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      nombre: PropTypes.string.isRequired,
      imagen: PropTypes.string.isRequired,
      descripcion: PropTypes.string.isRequired,
      ubicacion: PropTypes.string.isRequired,
      horario: PropTypes.string.isRequired,
      precio: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      actividades: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          nombre: PropTypes.string.isRequired,
        })
      ).isRequired,
      galeria: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        })
      ).isRequired,
      calificacion: PropTypes.number.isRequired,
      resenas: PropTypes.number.isRequired,
      coords: PropTypes.arrayOf(PropTypes.number).isRequired,
      categoria: PropTypes.string.isRequired,
    })
  ).isRequired,
  onOpenInfo: PropTypes.func.isRequired,
};

export default MapView;
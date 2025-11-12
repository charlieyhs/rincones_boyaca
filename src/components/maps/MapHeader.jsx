import PropTypes from 'prop-types';
import styles from './mapa.module.css';

const MapHeader = ({ mapStyle, setMapStyle }) => {
  const mapModes = [
    { id: 'satellite', label: 'Satélite' },
    { id: 'street', label: 'Mapa' },
    { id: 'smooth', label: 'Suave' },
  ];

  return (
    <div className={`${styles.glass_panel} ${styles.mapButtonsContainer}`}>
      {mapModes.map(({ id, label }) => (
        <button
          key={id}
          className={`${styles.map_button} ${mapStyle === id ? styles.active : ''}`}
          onClick={() => setMapStyle(id)}
          aria-pressed={mapStyle === id}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

MapHeader.propTypes = {
  mapStyle: PropTypes.oneOf(['satellite', 'street', 'smooth']).isRequired,
  setMapStyle: PropTypes.func.isRequired,
};

export default MapHeader;
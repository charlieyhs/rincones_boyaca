import PropTypes from 'prop-types';
import styles from './mapa.module.css';
import { IconButton } from '@mui/material';
import { useCallback } from 'react';
import { Circle, MyLocation } from '@mui/icons-material';
import { coloresCategorias } from '../../utils/mapsUtil';

const MapFooter = ({ mapStyle, setMapStyle, setUserLocation }) => {
  
  const mapModes = [
    { id: 'satellite', label: 'Satélite' },
    { id: 'street', label: 'Mapa' },
    { id: 'smooth', label: 'Suave' },
  ];

  const getCurrentLocation = useCallback(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation([
              position.coords.latitude,
              position.coords.longitude
            ]);
          },
          (error) => {
            console.error('Error obteniendo ubicación:', error);
            alert('No se pudo obtener tu ubicación. Verifica los permisos del navegador.');
          }
        );
      } else {
        alert('Tu navegador no soporta geolocalización.');
      }
    }, [setUserLocation]);

  return (
    <div className={styles.map_footer}>
      <div className={styles.glass_panel} style={{padding: '10px', position: 'absolute', right: '5px', bottom: 0}}>
        {coloresCategorias.map(({ color, id, label }) => (
          <div key={id} style={{display: 'flex', gap: '5px'}}>
            <Circle sx={{color,}}/>
            <p style={{color,}}>{label}</p>
          </div>
        ))}
      </div>

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
      {/* Botón de ubicación flotante */}
      <IconButton 
        onClick={getCurrentLocation}
        className={styles.locationButton}
        title="Mostrar mi ubicación"
        aria-label="Mostrar mi ubicación">
        <MyLocation />
      </IconButton>
    </div>
  );
};

MapFooter.propTypes = {
  mapStyle: PropTypes.oneOf(['satellite', 'street', 'smooth']).isRequired,
  setMapStyle: PropTypes.func.isRequired,
  setUserLocation: PropTypes.func.isRequired,
};

export default MapFooter;
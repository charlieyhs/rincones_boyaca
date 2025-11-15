import PropTypes from 'prop-types';
import styles from './mapa.module.css';
import { colors } from '../../utils/mapsUtil';
import { StarBorder } from '@mui/icons-material';

function truncate(text, n = 100) {
  return text.length > n ? text.slice(0, n) + "..." : text;
}

const PopupCard = ({ sitio, onOpenInfo }) => {
  return (
    <div className={styles.popupCard}>
      <img src={sitio.imagen} alt={sitio.nombre} 
        height={150} 
        style={{ borderRadius: "12px 12px 0 0", objectFit: 'cover', }}/>
      <div style={{padding: '15px'}}>

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <p style={{margin: 0, color: colors[sitio.categoria] || '#1f2937' }}>{sitio.categoria}</p>
          <div style={{display: 'flex', alignItems: 'center',}}>
            <StarBorder style={{fontSize: 'large', color: '#EAB308',}} sx={{ mr: 1 }} /> 
            <p style={{margin: 0, fontWeight: 'bold'}}>{sitio.calificacion}</p>
          </div>
        </div>
        <h3 className={styles.popupTitle}>{sitio.nombre}</h3>
        <p className={styles.popupDescription}>
          {truncate(sitio.descripcion, 100)}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenInfo();
          }}
          className={styles.popup_button}
        >
          Ver más información →
        </button>
      </div>
    </div>
  );
};

PopupCard.propTypes = {
  sitio: PropTypes.shape({
    color: PropTypes.string,
    categoria: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    imagen: PropTypes.string.isRequired,
    calificacion: PropTypes.number.isRequired,
  }).isRequired,
  onOpenInfo: PropTypes.func.isRequired,
};

export default PopupCard;
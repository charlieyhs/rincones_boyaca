import PropTypes from 'prop-types';
import styles from './mapa.module.css';

function truncate(text, n = 100) {
  return text.length > n ? text.slice(0, n) + "..." : text;
}

const PopupCard = ({ sitio, onOpenInfo }) => {
  return (
    <div className={styles.popupCard}>
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
  );
};

PopupCard.propTypes = {
  sitio: PropTypes.shape({
    color: PropTypes.string,
    categoria: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
  }).isRequired,
  onOpenInfo: PropTypes.func.isRequired,
};

export default PopupCard;
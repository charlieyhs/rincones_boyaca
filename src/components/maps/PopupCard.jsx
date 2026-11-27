import styles from './mapa.module.css';
import { colorCategoria } from '../../utils/mapsUtil';
import { truncar } from '../../utils/texto';
import { StarBorder } from '@mui/icons-material';

const PopupCard = ({ sitio, onOpenInfo }) => {
  return (
    <div className={styles.popupCard}>
      <img src={sitio.imagen} alt={sitio.nombre} 
        height={150} 
        style={{ borderRadius: "12px 12px 0 0", objectFit: 'cover', }}/>
      <div style={{padding: '15px'}}>

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <p style={{margin: 0, color: colorCategoria(sitio.categoria) }}>{sitio.categoria}</p>
          <div style={{display: 'flex', alignItems: 'center',}}>
            <StarBorder style={{fontSize: 'large', color: '#EAB308',}} sx={{ mr: 1 }} /> 
            <p style={{margin: 0, fontWeight: 'bold'}}>{sitio.calificacion}</p>
          </div>
        </div>
        <h3 className={styles.popupTitle}>{sitio.nombre}</h3>
        <p className={styles.popupDescription}>
          {truncar(sitio.descripcion, 100)}
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


export default PopupCard;
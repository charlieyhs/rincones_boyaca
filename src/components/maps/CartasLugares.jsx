import styles from './mapa.module.css'
import { colorCategoria } from '../../utils/mapsUtil';
import { MonetizationOn, PushPin, Star, Warning } from '@mui/icons-material';

const CartasLugares = ({openFilters, sitiosFiltrados, handleOpenInfoSitio}) => {

    return (
      <div className={`${styles.listView} ${openFilters ? styles.shifted : ''}`}>
        {sitiosFiltrados.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}><Warning /></div>
            <h3>No se encontraron sitios</h3>
            <p>Intenta con otra búsqueda o filtro diferente</p>
          </div>
        ) : (
          sitiosFiltrados.map((sitio) => (
            <button 
              key={sitio.id} 
              className={styles.listCard}
              onClick={() => handleOpenInfoSitio(sitio)}
            >
              <img 
                src={sitio.imagen} 
                alt={sitio.nombre}
                className={styles.listCardImage}
                loading="lazy" // Mejorar performance en móviles
              />
              <div className={styles.listCardContent}>
                <div className={styles.listCardHeader}>
                  <span 
                    className={styles.listCardCategory}
                    style={{ background: colorCategoria(sitio.categoria) }}
                  >
                    {sitio.categoria}
                  </span>
                  <div className={styles.listCardRating}>
                    <Star sx={{color: 'rgb(234, 179, 8)'}}/> {sitio.calificacion}
                    <span className={styles.ratingCount}>({sitio.resenas})</span>
                  </div>
                </div>
                <h3 className={styles.listCardTitle}>{sitio.nombre}</h3>
                <p className={styles.listCardLocation}>
                  <PushPin sx={{color: '#f43d72', fontSize: '1rem'}}/> 
                  {sitio.ubicacion}
                </p>
                <p className={styles.listCardDescription}>
                  {sitio.descripcion.substring(0, 120)}...
                </p>
                <div className={styles.listCardFooter}>
                  <span className={styles.listCardPrice}>
                    <MonetizationOn sx={{color: '#eb974a'}} /> 
                    {sitio.precio}
                  </span>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    );
};


export default CartasLugares;
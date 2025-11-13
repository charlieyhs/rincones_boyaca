import PropTypes from 'prop-types';
import styles from './mapa.module.css'

const CartasLugares = ({sitiosFiltrados, setFiltroCategoria, setSearchTerm, handleOpenInfoSitio}) => {

    return (
        <div className={styles.listView}>
          {sitiosFiltrados.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🔍</div>
              <h3>No se encontraron sitios</h3>
              <p>Intenta con otra búsqueda o filtro diferente</p>
              <button 
                onClick={() => {
                  setFiltroCategoria(null);
                  setSearchTerm('');
                }}
                className={styles.resetButton}
              >
                Ver todos los sitios
              </button>
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
                />
                <div className={styles.listCardContent}>
                  <div className={styles.listCardHeader}>
                    <span 
                      className={styles.listCardCategory}
                      style={{ background: sitio.color }}
                    >
                      {sitio.categoria}
                    </span>
                    <div className={styles.listCardRating}>
                      ⭐ {sitio.calificacion}
                      <span className={styles.ratingCount}>({sitio.resenas})</span>
                    </div>
                  </div>
                  <h3 className={styles.listCardTitle}>{sitio.nombre}</h3>
                  <p className={styles.listCardLocation}>📍 {sitio.ubicacion}</p>
                  <p className={styles.listCardDescription}>
                    {sitio.descripcion.substring(0, 120)}...
                  </p>
                  <div className={styles.listCardFooter}>
                    <span className={styles.listCardPrice}>💰 {sitio.precio}</span>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
    );
};

CartasLugares.propTypes = {
    sitiosFiltrados: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        nombre: PropTypes.string.isRequired,
        categoria: PropTypes.string.isRequired,
        color: PropTypes.string,
        imagen: PropTypes.string,
        ubicacion: PropTypes.string,
        descripcion: PropTypes.string,
        precio: PropTypes.string,
        calificacion: PropTypes.number,
        resenas: PropTypes.number,
    })).isRequired,
    setFiltroCategoria: PropTypes.func,
    setSearchTerm: PropTypes.func,
    handleOpenInfoSitio: PropTypes.func,
};

export default CartasLugares;
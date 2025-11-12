import PropTypes from 'prop-types';
import styles from './mapa.module.css';

const MapFilters = ({ colorsList, filtroCategoria, toggleFiltro, totalSitios }) => {
  return (
    <div className={styles.glass_panel}>
      <h3 className={styles.filterTitle}>🔍 Filtrar por categoría</h3>
      <div className={styles.filter_container}>
        {colorsList.map(cat => {
          const count = totalSitios.filter(s => s.categoria === cat.id).length;
          const isActive = filtroCategoria === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => toggleFiltro(cat.id)}
              className={`${styles.filter_chip} ${isActive ? styles.active : ''}`}
              style={{
                borderColor: cat.color,
                color: isActive ? 'white' : cat.color,
                background: isActive ? cat.color : 'white',
              }}
            >
              <div
                className={styles.colorDot}
                style={{ background: isActive ? 'white' : cat.color }}
              />
              {cat.label}
              <span className={styles.filter_badge}>{count}</span>
            </button>
          );
        })}
      </div>

      {filtroCategoria && (
        <button
          onClick={() => toggleFiltro(null)}
          className={styles.clearButton}
        >
          ✕ Limpiar filtro
        </button>
      )}
    </div>
  );
};

MapFilters.propTypes = {
  colorsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  filtroCategoria: PropTypes.string,
  toggleFiltro: PropTypes.func.isRequired,
  totalSitios: PropTypes.arrayOf(
    PropTypes.shape({
      categoria: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MapFilters;
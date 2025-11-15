import styles from "./mapa.module.css";
import { InputAdornment, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useMapFilters } from "../../hooks/useMapFilters";

const MapFilters = () => {
  const {
    colorsList,
    filtroCategoria,
    toggleFiltro,
    totalSitios,
    searchTerm,
    setSearchTerm,
  } = useMapFilters();

  return (
    <aside className={styles.contenedor_filtros}>
      {/* Buscador */}
      <div className={styles.searchContainer}>
        <TextField
          className={styles.searchInput}
          placeholder="Buscar sitios turísticos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            },
          }}
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm("")} className={styles.clearSearch}>
            ✕
          </button>
        )}
      </div>

      {/* Categorías */}
      <div className={styles.glass_panel}>
        <h3 className={styles.filterTitle}>Filtrar por categoría</h3>

        <div className={styles.filter_container}>
          {colorsList.map((cat) => {
            const count = totalSitios.filter((s) => s.categoria === cat.id).length;
            const isActive = filtroCategoria === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => toggleFiltro(cat.id)}
                className={`${styles.filter_chip} ${isActive ? styles.active : ""}`}
                style={{
                  borderColor: cat.color,
                  color: isActive ? "white" : cat.color,
                  background: isActive ? cat.color : "white",
                }}
              >
                <div
                  className={styles.colorDot}
                  style={{ background: isActive ? "white" : cat.color }}
                />
                {cat.label}
                <span className={styles.filter_badge}>{count}</span>
              </button>
            );
          })}
        </div>

        {filtroCategoria && (
          <button onClick={() => toggleFiltro(null)} className={styles.clearButton}>
            ✕ Limpiar filtro
          </button>
        )}
      </div>
    </aside>
  );
};

export default MapFilters;

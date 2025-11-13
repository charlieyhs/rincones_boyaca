import { useState, useMemo, useCallback } from 'react';
import { sitiosTuristicos } from '../../data/sitios';
import { colorsList } from '../../utils/mapsUtil';
import InfoSitio from '../dialogs/infoSitio/InfoSitio';
import MapFilters from './MapFilters';
import MapView from './MapView';
import styles from './mapa.module.css';
import { InputAdornment, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import CartasLugares from './CartasLugares';

function Mapa() {
  const [openInfoSitio, setOpenInfoSitio] = useState(false);
  const [sitio, setSitio] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('map'); // 'map' | 'list'
  

  const sitiosFiltrados = useMemo(() => {
    let filtered = sitiosTuristicos;
    
    if (filtroCategoria) {
      filtered = filtered.filter(s => s.categoria === filtroCategoria);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(s =>
        s.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [filtroCategoria, searchTerm]);

  const handleOpenInfoSitio = useCallback((sitio) => {
    setSitio(sitio);
    setOpenInfoSitio(true);
  }, []);

  const handleCloseInfoSitio = useCallback(() => {
    setOpenInfoSitio(false);
  }, []);

  const toggleFiltro = useCallback((categoria) => {
    setFiltroCategoria(prev => prev === categoria ? null : categoria);
  }, []);

  return (
    <div className={styles.mapContainer}>
      {/* Barra de búsqueda */}
      <div className={styles.searchContainer}>
        <TextField
          color='success'
          className={styles.searchInput}
          aria-label="Buscar sitios turísticos"
          placeholder="Buscar sitios turísticos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={
            {
              input:{
                  startAdornment: (
                      <InputAdornment position="start">
                          <Search/>
                      </InputAdornment>
                  ),
              },
            }
          }/>
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')}
            className={styles.clearSearch}
            aria-label="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filtros y controles superiores */}
      <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px'}}>
        <MapFilters
          colorsList={colorsList}
          filtroCategoria={filtroCategoria}
          toggleFiltro={toggleFiltro}
          totalSitios={sitiosTuristicos}
        />

        <div style={{display: 'flex', gap: '12px'}}>
          <div className={`${styles.glass_panel} ${styles.viewToggle}`}>
            <button
              onClick={() => setViewMode('map')}
              className={`${styles.view_button} ${viewMode === 'map' ? styles.active : ''}`}
              aria-pressed={viewMode === 'map'}
              aria-label="Vista de mapa"
            >
              🗺️ Mapa
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`${styles.view_button} ${viewMode === 'list' ? styles.active : ''}`}
              aria-pressed={viewMode === 'list'}
              aria-label="Vista de lista"
            >
              📋 Lista
            </button>
          </div>
        </div>
      </div>

      {/* Contador de resultados */}
      <div className={styles.resultsInfo}>
        <span className={styles.resultsCount}>
          {sitiosFiltrados.length} {sitiosFiltrados.length === 1 ? 'sitio' : 'sitios'}
          {filtroCategoria && ' en esta categoría'}
          {searchTerm && ' encontrados'}
        </span>
      </div>

      {/* Vista condicional: Mapa o Lista */}
      {viewMode === 'map' ? (
        <MapView
          sitios={sitiosFiltrados}
          onOpenInfo={handleOpenInfoSitio}
        />
      ) : (
        <CartasLugares
          sitiosFiltrados={sitiosFiltrados}
          setFiltroCategoria={setFiltroCategoria}
          setSearchTerm={setSearchTerm}
          handleOpenInfoSitio={handleOpenInfoSitio}
        />
      )}

      {/* Anuncio para lectores de pantalla */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className={styles.srOnly}
      >
        {sitiosFiltrados.length} sitios mostrados
      </div>

      {openInfoSitio && (
        <InfoSitio
          open={openInfoSitio}
          sitio={sitio}
          onClose={handleCloseInfoSitio}
        />
      )}
    </div>
  );
}

export default Mapa;
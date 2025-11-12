import { useState, useMemo, useCallback } from 'react';
import { sitiosTuristicos } from '../../data/sitios';
import { colorsList } from '../../utils/mapsUtil';
import InfoSitio from '../dialogs/infoSitio/InfoSitio';
import MapFilters from './MapFilters';
import MapHeader from './MapHeader';
import MapView from './MapView';
import styles from './mapa.module.css';
import { InputAdornment, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

function Mapa() {
  const [openInfoSitio, setOpenInfoSitio] = useState(false);
  const [sitio, setSitio] = useState(null);
  const [mapStyle, setMapStyle] = useState('satellite');
  const [filtroCategoria, setFiltroCategoria] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('map'); // 'map' | 'list'
  const [userLocation, setUserLocation] = useState(null);

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
          {/* Toggle Vista Lista/Mapa */}
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

          <MapHeader
            mapStyle={mapStyle}
            setMapStyle={setMapStyle}
          />
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
        <>
          <MapView
            mapStyle={mapStyle}
            sitios={sitiosFiltrados}
            onOpenInfo={handleOpenInfoSitio}
            userLocation={userLocation}
          />
          
          {/* Botón de ubicación flotante */}
          <button 
            onClick={getCurrentLocation}
            className={styles.locationButton}
            title="Mostrar mi ubicación"
            aria-label="Mostrar mi ubicación"
          >
            📍
          </button>
        </>
      ) : (
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
                    <button className={styles.listCardButton}>
                      Ver más →
                    </button>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
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
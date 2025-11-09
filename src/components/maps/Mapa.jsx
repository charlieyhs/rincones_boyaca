import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import { useState, useEffect } from 'react';
import { sitiosTuristicos } from '../../data/sitios';
import MarcadoresVisibles from './MarcadoresVisibles';
import { colorMarcadorPosicion, colorsList } from '../../utils/mapsUtil';
import InfoSitio from '../dialogs/infoSitio/InfoSitio';
import styles from './mapa.module.css';

function Mapa() {
  const [openInfoSitio, setOpenInfoSitio] = useState(false);
  const [sitio, setSitio] = useState(null);
  const [mapStyle, setMapStyle] = useState('satellite');
  const [filtroCategoria, setFiltroCategoria] = useState(null);
  const [sitiosFiltrados, setSitiosFiltrados] = useState(sitiosTuristicos);

  useEffect(() => {
    // Filtrar sitios por categoría
    if (filtroCategoria) {
      setSitiosFiltrados(
        sitiosTuristicos.filter(s => s.categoria === filtroCategoria)
      );
    } else {
      setSitiosFiltrados(sitiosTuristicos);
    }
  }, [filtroCategoria]);

  const handleOpenInfoSitio = (sitio) => {
    setSitio(sitio);
    setOpenInfoSitio(true);
  };

  const handleCloseInfoSitio = () => {
    setOpenInfoSitio(false);
  };

  const toggleFiltro = (categoria) => {
    setFiltroCategoria(filtroCategoria === categoria ? null : categoria);
  };

  const tileStyles = {
    satellite: {
      url: "https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg",
      attribution: '&copy; Stadia Maps'
    },
    street: {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: '&copy; OpenStreetMap'
    },
    smooth: {
      url: "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
      attribution: '&copy; Stadia Maps'
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {/* Panel de control superior */}
      <div className={styles.control_panel}>
        <div className={styles.glass_panel}>
          <h1 style={{ 
            margin: 0, 
            fontSize: '24px', 
            fontWeight: 'bold',
            color: '#1f2937',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            🗺️ Descubre Boyacá
          </h1>
          <p style={{ 
            margin: '5px 0 0 0', 
            fontSize: '14px',
            color: '#6b7280'
          }}>
            {sitiosFiltrados.length} de {sitiosTuristicos.length} sitios
            {filtroCategoria && ` · ${filtroCategoria}`}
          </p>
        </div>

        {/* Selector de estilo de mapa */}
        <div className={styles.glass_panel} style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setMapStyle('satellite')}
            className={`${styles.map_button} ${mapStyle === 'satellite' ? styles.active : ''}`}
          >
            🛰️ Satélite
          </button>
          <button
            onClick={() => setMapStyle('street')}
            className={`${styles.map_button} ${mapStyle === 'street' ? styles.active : ''}`}
          >
            🗺️ Mapa
          </button>
          <button
            onClick={() => setMapStyle('smooth')}
            className={`${styles.map_button} ${mapStyle === 'smooth' ? styles.active : ''}`}
          >
            ✨ Suave
          </button>
        </div>
      </div>

      {/* Filtros de categoría */}
      <div style={{
        position: 'absolute',
        top: '100px',
        left: '20px',
        zIndex: 1000,
      }}>
        <div className={styles.glass_panel}>
          <h3 style={{ 
            margin: '0 0 12px 0', 
            fontSize: '14px', 
            fontWeight: '600',
            color: '#1f2937'
          }}>
            🔍 Filtrar por categoría
          </h3>
          <div className={styles.filter_container}>
            {colorsList.map(cat => {
              const count = sitiosTuristicos.filter(s => s.categoria === cat.id).length;
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
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: isActive ? 'white' : cat.color,
                  }}></div>
                  {cat.label}
                  <span className={styles.filter_badge}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
          {filtroCategoria && (
            <button
              onClick={() => setFiltroCategoria(null)}
              style={{
                marginTop: '10px',
                padding: '6px 12px',
                borderRadius: '8px',
                border: 'none',
                background: '#ef4444',
                color: 'white',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '600',
                width: '100%',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.target.style.background = '#dc2626'}
              onMouseOut={(e) => e.target.style.background = '#ef4444'}
              onFocus={(e) => e.target.style.background = '#dc2626'}
              onBlur={(e) => e.target.style.background = '#ef4444'}
            >
              ✕ Limpiar filtro
            </button>
          )}
        </div>
      </div>

      {/* Leyenda de categorías */}
      <div className={`${styles.glass_panel} ${styles.legend_panel}`}>
        <h3 style={{ 
          margin: '0 0 10px 0', 
          fontSize: '14px', 
          fontWeight: '600',
          color: '#1f2937'
        }}>
          📌 Leyenda
        </h3>
        <div>
          {colorsList.map(cat => (
            <div 
              key={cat.id} 
              className={styles.legend_item}
              onClick={() => toggleFiltro(cat.id)}
            >
              <div 
                className={styles.legend_color}
                style={{ background: cat.color }}
              ></div>
              <span style={{ 
                fontSize: '13px', 
                color: '#374151',
                fontWeight: filtroCategoria === cat.id ? '600' : '400'
              }}>
                {cat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mapa de Leaflet */}
      <div className={styles.mapa_wrapper}>
        <MapContainer
          center={[5.6513754, -74.1571872]}
          zoom={13}
          zoomControl={false}
          scrollWheelZoom={true}
        >
          <TileLayer
            url={tileStyles[mapStyle].url}
            attribution={tileStyles[mapStyle].attribution}
          />
          
          <ZoomControl position="bottomright" />
          <MarcadoresVisibles sitios={sitiosFiltrados} />

          {sitiosFiltrados.map((sitio) => (
            <Marker 
              key={sitio.id} 
              position={sitio.coords} 
              icon={colorMarcadorPosicion(sitio.categoria)}
            >
              <Popup maxWidth={300} className="custom-popup">
                <div style={{ padding: '5px' }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    background: sitiosTuristicos.find(s => s.id === sitio.id)?.color || '#f3f4f6',
                    fontSize: '11px',
                    fontWeight: '600',
                    color: 'white',
                    marginBottom: '8px'
                  }}>
                    {sitio.categoria}
                  </div>
                  <h3 style={{ 
                    margin: '0 0 8px 0', 
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#1f2937'
                  }}>
                    {sitio.nombre}
                  </h3>
                  <p style={{
                    margin: '0 0 12px 0',
                    fontSize: '13px',
                    color: '#6b7280',
                    lineHeight: '1.5'
                  }}>
                    {sitio.descripcion.substring(0, 100)}...
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenInfoSitio(sitio);
                    }}
                    className={styles.popup_button}
                  >
                    Ver más información →
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
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
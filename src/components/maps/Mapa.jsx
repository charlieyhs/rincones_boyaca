import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import { useState} from 'react';
import { sitiosTuristicos } from '../../data/sitios';
import MarcadoresVisibles from './MarcadoresVisibles';
import { colorMarcadorPosicion, colorsList } from '../../utils/mapsUtil';
import InfoSitio from '../dialogs/infoSitio/InfoSitio';

function MapaBoyaca() {
  const [openInfoSitio, setOpenInfoSitio] = useState(false);
  const [sitio, setSitio] = useState(null);
  const [mapStyle, setMapStyle] = useState('satellite');

  const handleOpenInfoSitio = (sitio) => {
    setSitio(sitio);
    setOpenInfoSitio(true);
  };

  const handleCloseInfoSitio = () => {
    setOpenInfoSitio(false);
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
      {/* Header con título y controles */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '15px 25px',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
        }}>
          <h1 style={{ 
            margin: 0, 
            fontSize: '24px', 
            fontWeight: 'bold',
            color: '#1f2937'
          }}>
            🗺️ Descubre Boyacá
          </h1>
          <p style={{ 
            margin: '5px 0 0 0', 
            fontSize: '14px',
            color: '#6b7280'
          }}>
            {sitiosTuristicos.length} sitios turísticos
          </p>
        </div>

        {/* Selector de estilo de mapa */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '10px',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          display: 'flex',
          gap: '8px'
        }}>
          <button
            onClick={() => setMapStyle('satellite')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: mapStyle === 'satellite' ? '#3b82f6' : '#e5e7eb',
              color: mapStyle === 'satellite' ? 'white' : '#374151',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
          >
            Satélite
          </button>
          <button
            onClick={() => setMapStyle('street')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: mapStyle === 'street' ? '#3b82f6' : '#e5e7eb',
              color: mapStyle === 'street' ? 'white' : '#374151',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
          >
            Mapa
          </button>
          <button
            onClick={() => setMapStyle('smooth')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: mapStyle === 'smooth' ? '#3b82f6' : '#e5e7eb',
              color: mapStyle === 'smooth' ? 'white' : '#374151',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
          >
            Suave
          </button>
        </div>
      </div>

      {/* Leyenda de categorías */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        zIndex: 1000,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '15px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
      }}>
        <h3 style={{ 
          margin: '0 0 10px 0', 
          fontSize: '14px', 
          fontWeight: '600',
          color: '#1f2937'
        }}>
          📌 Categorías
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {colorsList.map(cat => {
            
            return (
              <div key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: cat.color,
                  border: '2px solid white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}></div>
                <span style={{ fontSize: '13px', color: '#374151' }}>{cat.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mapa de Leaflet */}
      <div className="mapa-wrapper">

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
          
          {/* Control de zoom personalizado */}
          <ZoomControl position="bottomright" />
          
          {/* Ajustar vista a todos los marcadores */}
          <MarcadoresVisibles sitios={sitiosTuristicos} />

          {/* Marcadores con iconos personalizados por categoría */}
          {sitiosTuristicos.map((sitio) => (
            <Marker 
              key={sitio.id} 
              position={sitio.coords} 
              icon={colorMarcadorPosicion(sitio.categoria)}
            >
              <Popup
                maxWidth={300}
                className="custom-popup"
              >
                <div style={{ padding: '5px' }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    background: '#f3f4f6',
                    fontSize: '11px',
                    fontWeight: '600',
                    color: '#6b7280',
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
                    color: '#6b7280'
                  }}>
                    {sitio.descripcion}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenInfoSitio(sitio);
                    }}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: 'none',
                      background: '#3b82f6',
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '14px',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.background = '#2563eb'}
                    onMouseOut={(e) => e.target.style.background = '#3b82f6'}
                    onFocus={(e) => e.target.style.background = '#2563eb'}
                    onBlur={(e) => e.target.style.background = '#3b82f6'}
                  >
                    Ver más información →
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Modal de información */}
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

export default MapaBoyaca;
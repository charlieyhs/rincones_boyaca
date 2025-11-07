import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import '../../css/mapa.css'
import { sitiosTuristicos } from '../../data/sitios';
import { useState } from 'react';
import InfoSitio from '../dialogs/infoSitio';

function MapaBoyaca() {
  const [openInfoSitio, setOpenInfoSitio] = useState(false);
  const [sitio, setSitio] = useState({}); 

  const handleOpenInfoSitio = (sitio) => {
    setSitio(sitio);
    setOpenInfoSitio(true);
  };

  const handleCloseInfoSitio = () => {
    setOpenInfoSitio(false);
  };

  return (
    <div>
      <div className="mapa-wrapper">  
        <MapContainer
          center={[5.6513754, -74.1571872]}
          zoom={13}
        >
          {/* Capa base (OpenStreetMap) */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />      

          {/* Marcadores de sitios turísticos */}
          {sitiosTuristicos.map((sitio) => (
            <Marker key={sitio.id} position={sitio.coords}>
              <Popup>
                <strong>{sitio.nombre}</strong><br />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenInfoSitio(sitio);
                  }}
                >
                  Ver información
                </button>
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

export default MapaBoyaca;
import { useEffect } from "react";
import L from 'leaflet';
import { useMap } from "react-leaflet";
import PropTypes from "prop-types";

const MarcadoresVisibles = ({ sitios }) => {
  const map = useMap();
  
  useEffect(() => {
    if (sitios.length > 0) {
      const bounds = L.latLngBounds(sitios.map(s => s.coords));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [sitios, map]);
  
  return null;
};
MarcadoresVisibles.propTypes = {
  sitios: PropTypes.arrayOf().isRequired
}
export default MarcadoresVisibles;
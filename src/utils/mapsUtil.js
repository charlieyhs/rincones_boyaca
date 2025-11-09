import L from 'leaflet';
import styles from "../components/maps/mapa.module.css"

export const colors = {
  HISTORICO: '#3b82f6',
  MONUMENTO: '#ef4444',
  COLONIAL: '#10b981',
  NATURAL: '#f59e0b'
};

export const colorsList = Object.entries(colors).map(([id, color]) => ({
  id,
  label: id.charAt(0) + id.slice(1).toLowerCase(), // "HISTORICO" -> "Historico"
  color
}));


// Iconos personalizados por categoría con SVG
export function colorMarcadorPosicion(categoria){

  const color = colors[categoria] || '#6366f1';
  
  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 16 16">
      <path fill="${color}" d="M8 0C5.2 0 3 2.2 3 5s4 11 5 11s5-8.2 5-11s-2.2-5-5-5zm0 8C6.3 8 5 6.7 5 5s1.3-3 3-3s3 1.3 3 3s-1.3 3-3 3z"/>
    </svg>
  `;
  
  return new L.DivIcon({
    html: svgIcon,
    className: styles.custom_marker,
    iconSize: [40, 50],
    iconAnchor: [20, 50],
    popupAnchor: [0, -50]
  });
};
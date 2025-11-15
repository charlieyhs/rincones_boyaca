import L from 'leaflet';
import styles from "../components/maps/mapa.module.css";

export const colors = {
  HISTORICO: '#3b82f6',
  MONUMENTO: '#ef4444',
  COLONIAL: '#10b981',
  NATURAL: '#f59e0b'
};

export const colorsList = Object.entries(colors).map(([id, color]) => ({
  id,
  label: id.charAt(0) + id.slice(1).toLowerCase(),
  color
}));

export function colorMarcadorPosicion(categoria) {
  const color = colors[categoria] || '#6366f1';
  
  const svgIcon = `
    <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
      <!-- Sombra suave -->
      <ellipse cx="20" cy="47" rx="10" ry="3" fill="rgba(0,0,0,0.25)"/>
      
      <!-- Pin con gradiente -->
      <defs>
        <linearGradient id="grad-${categoria}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color};stop-opacity:0.8" />
        </linearGradient>
        <filter id="shadow-${categoria}">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3"/>
        </filter>
      </defs>
      
      <!-- Pin principal con filtro de sombra -->
      <path 
        d="M20 0 C9 0 0 9 0 20 C0 30 20 50 20 50 C20 50 40 30 40 20 C40 9 31 0 20 0 Z" 
        fill="url(#grad-${categoria})"
        filter="url(#shadow-${categoria})"
      />
      
      <!-- Círculo interior brillante -->
      <circle cx="20" cy="18" r="8" fill="white" opacity="0.95"/>
      
      <!-- Punto central -->
      <circle cx="20" cy="18" r="5" fill="${color}"/>
      
      <!-- Brillo superior -->
      <circle cx="18" cy="15" r="2" fill="white" opacity="0.6"/>
    </svg>
  `;
  
  return new L.DivIcon({
    html: svgIcon,
    className: `${styles.custom_marker} marker-${categoria}`,
    iconSize: [40, 50],
    iconAnchor: [20, 50],
    popupAnchor: [0, -50]
  });
}

export function marcadorPosicionActual() {  
  const svgIcon = `
    <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
      <!-- Onda exterior animada -->
      <circle cx="25" cy="25" r="10" fill="rgba(59,130,246,0.25)">
        <animate attributeName="r" from="10" to="20" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.8" to="0" dur="1.5s" repeatCount="indefinite" />
      </circle>
      
      <!-- Punto principal -->
      <circle cx="25" cy="25" r="8" fill="#3b82f6" stroke="white" stroke-width="2"/>
    </svg>
  `;
  
  return new L.DivIcon({
    html: svgIcon,
    className: 'user-location-icon',
    iconSize: [50, 50],
    iconAnchor: [25, 25],
  });
}

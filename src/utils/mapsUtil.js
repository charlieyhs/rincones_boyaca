import L from 'leaflet';
import styles from "../components/maps/mapa.module.css";

export const colors = {
  HISTORICO: '#3b82f6',
  MONUMENTO: '#ef4444',
  COLONIAL: '#10b981',
  NATURAL: '#f59e0b'
};

export const COLOR_DEFECTO = '#6366f1';

export function colorCategoria(categoria) {
  return colors[categoria] || COLOR_DEFECTO;
}

export const coloresCategorias = Object.entries(colors).map(([id, color]) => ({
  id,
  label: id.charAt(0) + id.slice(1).toLowerCase(),
  color
}));

export function colorMarcadorPosicion(categoria) {
  const color = colorCategoria(categoria);
  
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

/** Marcador circular con el número de la parada, para el itinerario de un plan. */
export function marcadorNumerado(numero, color = COLOR_DEFECTO) {
  return new L.DivIcon({
    html: `<div style="width:32px;height:32px;border-radius:50%;background:${color};color:#fff;
      border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.4);display:flex;align-items:center;
      justify-content:center;font:bold 14px sans-serif">${numero}</div>`,
    className: 'marcador-numerado',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
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

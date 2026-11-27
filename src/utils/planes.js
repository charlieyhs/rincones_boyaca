import { sitiosTuristicos } from '../data/sitios';
import { empresas, planes } from '../data/planes';

const sitiosPorId = new Map(sitiosTuristicos.map((s) => [s.id, s]));
const empresasPorId = new Map(empresas.map((e) => [e.id, e]));

export const obtenerSitio = (id) => sitiosPorId.get(id) ?? null;

/** Plan con su empresa y cada parada resuelta a su sitio (las paradas sin sitio se omiten). */
export function obtenerPlan(slug) {
  const plan = planes.find((p) => p.slug === slug);
  if (!plan) return null;
  return {
    ...plan,
    empresa: empresasPorId.get(plan.empresaId) ?? null,
    paradas: plan.paradas
      .map((p) => ({ ...p, sitio: sitiosPorId.get(p.sitioId) }))
      .filter((p) => p.sitio),
  };
}

export function listarPlanes() {
  return planes.map((p) => obtenerPlan(p.slug));
}

export function planesConSitio(sitioId) {
  return listarPlanes().filter((p) => p.paradas.some((parada) => parada.sitioId === sitioId));
}

/** Agrupa las paradas por día conservando el orden: [{ dia, paradas: [{...parada, numero}] }]. */
export function paradasPorDia(paradas) {
  const dias = new Map();
  paradas.forEach((parada, i) => {
    if (!dias.has(parada.dia)) dias.set(parada.dia, []);
    dias.get(parada.dia).push({ ...parada, numero: i + 1 });
  });
  return [...dias].map(([dia, paradasDia]) => ({ dia, paradas: paradasDia }));
}

export function formatearPrecio({ valor, moneda, unidad }) {
  const monto = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: moneda,
    maximumFractionDigits: 0,
  }).format(valor);
  return unidad ? `${monto} ${unidad}` : monto;
}

export const textoDuracion = (dias) => (dias === 1 ? '1 día' : `${dias} días`);

/** Distancia en línea recta entre dos coordenadas [lat, lng], en km. */
export function distanciaKm([lat1, lng1], [lat2, lng2]) {
  const rad = (g) => (g * Math.PI) / 180;
  const dLat = rad(lat2 - lat1);
  const dLng = rad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** Ruta en Google Maps que pasa por todas las paradas en orden. */
export function urlRutaGoogleMaps(paradas) {
  const puntos = paradas.map((p) => p.sitio.coords.join(','));
  if (puntos.length === 0) return null;
  const destino = puntos.at(-1);
  const intermedios = puntos.slice(0, -1);
  const params = new URLSearchParams({ api: '1', destination: destino, travelmode: 'driving' });
  if (intermedios.length > 0) params.set('waypoints', intermedios.join('|'));
  return `https://www.google.com/maps/dir/?${params}`;
}

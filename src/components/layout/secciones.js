import { Map, Tour } from "@mui/icons-material";

/** Secciones principales del sitio. Las usan el menú superior y el footer. */
export const SECCIONES = [
  { to: "/", label: "Explorar mapa", icono: Map, end: true },
  { to: "/planes", label: "Planes turísticos", icono: Tour },
];

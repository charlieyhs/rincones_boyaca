import { Directions, Navigation, PushPin } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { colorCategoria } from "../../../utils/mapsUtil";

/**
 * Indicaciones para llegar al sitio: abre la ruta en Google Maps o Waze
 * desde la ubicación actual del usuario hasta las coordenadas del sitio.
 */
const ComoLlegar = ({ sitio }) => {
  const color = colorCategoria(sitio.categoria);
  const [lat, lng] = sitio.coords;

  const opciones = [
    {
      id: "google",
      label: "Abrir en Google Maps",
      icon: <Directions />,
      url: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
    },
    {
      id: "waze",
      label: "Abrir en Waze",
      icon: <Navigation />,
      url: `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`,
    },
  ];

  return (
    <Paper
      sx={{
        p: 3,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        color: "#fff",
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" sx={{ color, mb: 2, display: "flex", alignItems: "center" }}>
        <Directions sx={{ mr: 1 }} />
        ¿Cómo llegar?
      </Typography>

      <Typography variant="body2" sx={{ mb: 1, display: "flex", alignItems: "center", gap: "5px" }}>
        <PushPin sx={{ color: "#f43d72" }} /> Destino: {sitio.ubicacion}
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, opacity: 0.8 }}>
        La ruta se calcula desde tu ubicación actual en la aplicación que elijas.
      </Typography>

      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {opciones.map(({ id, label, icon, url }) => (
          <Button
            key={id}
            component="a"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            startIcon={icon}
            sx={{
              borderColor: color,
              color,
              "&:hover": { backgroundColor: `${color}20`, borderColor: color },
            }}
          >
            {label}
          </Button>
        ))}
      </Box>
    </Paper>
  );
};

export default ComoLlegar;

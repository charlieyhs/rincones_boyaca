import { CameraAlt, Close, Hiking, Map, Star, Timeline } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  LinearProgress,
  Paper,
  Typography,
  Zoom,
  CardMedia,
  Grid
} from "@mui/material";

import PropTypes from "prop-types";

const InfoSitio = ({ sitio, open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slots={{ transition: Zoom }}
      transitionDuration={400}
      slotProps={{
        paper: {
          sx: {
            background: "linear-gradient(145deg, #0a2a1d 0%, #143b2b 100%)",
            color: "#fff",
            borderRadius: 3,
            border: `1px solid ${sitio?.color || "#66bb6a"}40`,
          },
        },
      }}
    >
      {/* Título con ícono y cierre */}
      <DialogTitle
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              display: "inline-flex",
              p: 2,
              borderRadius: "50%",
              backgroundColor: `${sitio.color || "#66bb6a"}20`,
              color: sitio.color || "#66bb6a",
            }}
          >
            <Map />
          </Box>
          <Box>
            <Typography
              variant="h4"
              sx={{ color: sitio.color || "#66bb6a", fontWeight: "bold" }}
            >
              {sitio.nombre}
            </Typography>
            <Chip
              label={sitio.categoria}
              size="small"
              sx={{
                backgroundColor: sitio.color || "#66bb6a",
                color: "#fff",
                mt: 1,
              }}
            />
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ color: "#fff" }}>
          <Close />
        </IconButton>
      </DialogTitle>

      {/* Contenido principal */}
      <DialogContent>
        <Grid container spacing={3}>
          {/* Imagen principal */}
          <Grid size={{ xs: 12 }}>
            <CardMedia
              component="img"
              image={sitio.imagen}
              alt={sitio.nombre}
              sx={{
                height: 300,
                borderRadius: 2,
                objectFit: "cover",
                mb: 2,
                border: `1px solid ${sitio.color || "#66bb6a"}40`,
              }}
            />
          </Grid>

          {/* Descripción */}
          <Grid size={{ xs: 12 }}>
            <Typography
              variant="h6"
              sx={{ color: sitio.color || "#66bb6a", mb: 1 }}
            >
              Descripción
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 3 }}>
              {sitio.descripcion}
            </Typography>
          </Grid>

          {/* Actividades y fotos */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              sx={{
                p: 3,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: sitio.color || "#66bb6a",
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Hiking sx={{ mr: 1 }} />
                Actividades Populares
              </Typography>
              {sitio.actividades && sitio.actividades.map((act) => (
                <Chip
                  key={act.id}
                  label={act.nombre}
                  size="small"
                  sx={{
                    mr: 1,
                    mb: 1,
                    backgroundColor: `${sitio.color || "#66bb6a"}20`,
                    color: "#fff",
                  }}
                />
              ))}
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              sx={{
                p: 3,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: sitio.color || "#66bb6a",
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CameraAlt sx={{ mr: 1 }} />
                Galería
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {sitio.galeria && sitio.galeria.map((img, i) => (
                  <Box
                    key={img.id}
                    component="img"
                    src={img.url}
                    alt={`foto-${i}`}
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 1,
                      objectFit: "cover",
                      border: `1px solid ${sitio.color || "#66bb6a"}40`,
                    }}
                  />
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Información adicional */}
          <Grid size={{ xs: 12 }}>
            <Paper
              sx={{
                p: 3,
                mt: 2,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: sitio.color || "#66bb6a",
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Timeline sx={{ mr: 1 }} />
                Información Relevante
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                📍 Ubicación: {sitio.ubicacion}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                🕒 Horario: {sitio.horario}
              </Typography>
              <Typography variant="body2">
                💰 Entrada: {sitio.precio}
              </Typography>
            </Paper>
          </Grid>

          {/* Calificación */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ mt: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  color: sitio.color || "#66bb6a",
                  mb: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Star sx={{ mr: 1 }} />
                Calificación promedio
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(sitio.calificacion / 5) * 100}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: sitio.color || "#66bb6a",
                  },
                }}
              />
              <Typography sx={{ mt: 1 }}>
                {sitio.calificacion} / 5 basado en {sitio.resenas} reseñas
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      {/* Acciones */}
      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button
          variant="outlined"
          sx={{
            borderColor: sitio.color || "#66bb6a",
            color: sitio.color || "#66bb6a",
            "&:hover": {
              backgroundColor: `${sitio.color || "#66bb6a"}20`,
              borderColor: sitio.color || "#66bb6a",
            },
          }}
        >
          Ver en mapa
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: sitio.color || "#66bb6a",
            "&:hover": {
              backgroundColor: sitio.color || "#66bb6a",
              filter: "brightness(0.9)",
            },
          }}
        >
          Cómo llegar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

InfoSitio.propTypes = {
  sitio: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    categoria: PropTypes.string.isRequired,
    imagen: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    ubicacion: PropTypes.string.isRequired,
    horario: PropTypes.string,
    precio: PropTypes.string,
    color: PropTypes.string,
    actividades: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        nombre: PropTypes.string.isRequired
      })
    ),
    galeria: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      })
    ),
    calificacion: PropTypes.number,
    resenas: PropTypes.number,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default InfoSitio;
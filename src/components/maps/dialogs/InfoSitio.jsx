import styles from "./InfoSito.module.css"
import { CameraAlt, Close, Hiking, MonetizationOn, PushPin, Star, Timeline, WatchLater } from "@mui/icons-material";
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
  Grid,
  useMediaQuery
} from "@mui/material";
import { colorCategoria } from "../../../utils/mapsUtil";

function urlComoLlegar([lat, lng]) {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

const InfoSitio = ({ sitio, open, onClose, onVerEnMapa }) => {
  const color = colorCategoria(sitio.categoria);
  const pantallaPequena = useMediaQuery("(max-width: 768px)");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slots={{ transition: Zoom }}
      transitionDuration={400}
      fullScreen={pantallaPequena}
      slotProps={{
        paper: {
          sx: {
            background: "linear-gradient(145deg, #0a2a1d 0%, #143b2b 100%)",
            color: "#fff",
            borderRadius: 3,
            border: `1px solid ${color}40`,
          },
        },
      }}
    >
      <DialogTitle
        component="div"
        className={styles.titulo_dialogo}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              display: "inline-flex",
              p: 2,
              borderRadius: "50%",
              backgroundColor: `${color}20`,
              color: color,
            }}
          >
            <Hiking />
          </Box>
          <Box>
            <h2 style={{color: color, fontWeight: "bold"}}>
              {sitio.nombre}
            </h2>
            <Chip
              label={sitio.categoria}
              size="small"
              sx={{
                backgroundColor: color,
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

      <DialogContent>
        <Grid container spacing={3}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CardMedia
                component="img"
                image={sitio.imagen}
                alt={sitio.nombre}
                sx={{
                  height: 300,
                  borderRadius: 2,
                  mb: 2,
                  border: `1px solid ${color}40`,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography
                variant="h6"
                sx={{ color: color, mb: 1 }}
              >
                Descripción
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 3 }}>
                {sitio.descripcion}
              </Typography>
            </Grid>
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
                  color: color,
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Hiking sx={{ mr: 1 }} />
                Actividades Populares
              </Typography>
              {sitio?.actividades.map((act) => (
                <Chip
                  key={act.id}
                  label={act.nombre}
                  size="small"
                  className={styles.chip_actividad}
                  sx={{
                    backgroundColor: `${color}20`,
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
                  color: color,
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CameraAlt sx={{ mr: 1 }} />
                Galería
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {sitio?.galeria.map((img, i) => (
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
                      border: `1px solid ${color}40`,
                    }}
                  />
                ))}
              </Box>
            </Paper>
          </Grid>

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
                  color: color,
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Timeline sx={{ mr: 1 }} />
                Información Relevante
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, color: '#fff', display: 'flex', alignItems: 'center', gap: '5px',}}>
                <PushPin sx={{color: '#f43d72', }}/>  Ubicación: {sitio.ubicacion}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, color: '#fff', display: 'flex', alignItems: 'center', gap: '5px',}}>
                <WatchLater /> Horario: {sitio.horario}
              </Typography>
              <Typography variant="body2" sx={{color: '#fff', display: 'flex', alignItems: 'center', gap: '5px',}}>
                <MonetizationOn sx={{color: '#eb974a'}} />  Entrada: {sitio.precio}
              </Typography>
            </Paper>
          </Grid>

          {/* Calificación */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ mt: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  color: color,
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
                    backgroundColor: color,
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
          onClick={() => onVerEnMapa(sitio)}
          sx={{
            borderColor: color,
            color: color,
            "&:hover": {
              backgroundColor: `${color}20`,
              borderColor: color,
            },
          }}
        >
          Ver en mapa
        </Button>
        <Button
          variant="contained"
          component="a"
          href={urlComoLlegar(sitio.coords)}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            backgroundColor: color,
            "&:hover": {
              backgroundColor: color,
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


export default InfoSitio;
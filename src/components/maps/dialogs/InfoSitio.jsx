import styles from "./InfoSito.module.css"
import { CameraAlt, Hiking, MonetizationOn, PushPin, Star, Timeline, WatchLater } from "@mui/icons-material";
import { Box, CardMedia, Chip, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import PropTypes from "prop-types";

const COLOR_DEFECTO = "#66bb6a";

const InfoSitio = ({sitio}) => {
    return (
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
                    border: `1px solid ${sitio.color || COLOR_DEFECTO}40`,
                }}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                variant="h6"
                sx={{ color: sitio.color || COLOR_DEFECTO, mb: 1 }}
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
                    color: sitio.color || COLOR_DEFECTO,
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
                    backgroundColor: `${sitio.color || COLOR_DEFECTO}20`,
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
                    color: sitio.color || COLOR_DEFECTO,
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
                        border: `1px solid ${sitio.color || COLOR_DEFECTO}40`,
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
                    color: sitio.color || COLOR_DEFECTO,
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
                    color: sitio.color || COLOR_DEFECTO,
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
                    backgroundColor: sitio.color || COLOR_DEFECTO,
                    },
                }}
                />
                <Typography sx={{ mt: 1 }}>
                {sitio.calificacion} / 5 basado en {sitio.resenas} reseñas
                </Typography>
            </Box>
            </Grid>
        </Grid>
    );
};

InfoSitio.propTypes = {
  sitio: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    imagen: PropTypes.string.isRequired,
    color: PropTypes.string, 
    descripcion: PropTypes.string.isRequired,
    
    actividades: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        nombre: PropTypes.string.isRequired,
      })
    ),
    
    galeria: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        url: PropTypes.string.isRequired,
      })
    ),

    ubicacion: PropTypes.string.isRequired,
    horario: PropTypes.string.isRequired,
    precio: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, 
    
    calificacion: PropTypes.number.isRequired,
    resenas: PropTypes.number.isRequired,
  }).isRequired,
};

export default InfoSitio;
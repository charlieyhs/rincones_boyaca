import { Link, useParams } from "react-router";
import { Box, Button, Chip, Grid, Paper, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import InfoSitio from "../components/maps/dialogs/InfoSitio";
import ComoLlegar from "../components/maps/dialogs/ComoLlegar";
import TarjetaPlan from "../components/planes/TarjetaPlan";
import NoEncontradoPage from "./NoEncontradoPage";
import { obtenerSitio, planesConSitio } from "../utils/planes";
import { colorCategoria } from "../utils/mapsUtil";

const SitioDetallePage = () => {
  const { id } = useParams();
  const sitio = obtenerSitio(id);

  if (!sitio) return <NoEncontradoPage mensaje="Este sitio turístico no existe." />;

  const color = colorCategoria(sitio.categoria);
  const planes = planesConSitio(sitio.id);

  return (
    <div className="pagina">
      <title>{`${sitio.nombre} | Rincones Boyacá`}</title>

      <Button component={Link} to="/" startIcon={<ArrowBack />} color="success" sx={{ mb: 2 }}>
        Volver al mapa
      </Button>

      {/* Mismo estilo oscuro que la ficha del diálogo, para reutilizar InfoSitio y ComoLlegar */}
      <Paper
        sx={{
          p: { xs: 2, sm: 4 }, borderRadius: 3, color: "#fff",
          background: "linear-gradient(145deg, #0a2a1d 0%, #143b2b 100%)",
          border: `1px solid ${color}40`,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ color, fontWeight: "bold" }}>{sitio.nombre}</Typography>
        <Chip label={sitio.categoria} size="small" sx={{ bgcolor: color, color: "#fff", mt: 1, mb: 3 }} />
        <InfoSitio sitio={sitio} />
        <Box sx={{ mt: 3 }}>
          <ComoLlegar sitio={sitio} />
        </Box>
      </Paper>

      <Typography variant="h5" component="h2" sx={{ fontWeight: "bold", color: "success.main", mt: 4, mb: 2 }}>
        Planes que pasan por aquí
      </Typography>
      {planes.length === 0 ? (
        <Typography>Todavía no hay planes publicados que incluyan este sitio.</Typography>
      ) : (
        <Grid container spacing={3}>
          {planes.map((plan) => (
            <Grid key={plan.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <TarjetaPlan plan={plan} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default SitioDetallePage;

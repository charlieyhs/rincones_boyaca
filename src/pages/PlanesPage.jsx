import { Alert, Grid, Typography } from "@mui/material";
import TarjetaPlan from "../components/planes/TarjetaPlan";
import { listarPlanes } from "../utils/planes";

const planes = listarPlanes();

const PlanesPage = () => (
  <div className="pagina">
    <title>Planes turísticos | Rincones Boyacá</title>
    <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", color: "success.main" }}>
      Planes turísticos
    </Typography>
    <Typography sx={{ mt: 1, mb: 2 }}>
      Recorridos armados por operadores locales, con itinerario, ruta y la historia de cada sitio.
    </Typography>
    {planes.some((p) => p.demo) && (
      <Alert severity="info" sx={{ mb: 3 }}>
        Los planes y empresas que ves aquí son de ejemplo, para mostrar cómo funciona la plataforma.
      </Alert>
    )}
    <Grid container spacing={3}>
      {planes.map((plan) => (
        <Grid key={plan.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <TarjetaPlan plan={plan} />
        </Grid>
      ))}
    </Grid>
  </div>
);

export default PlanesPage;

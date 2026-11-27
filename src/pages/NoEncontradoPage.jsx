import { Link } from "react-router";
import { Button, Paper, Typography } from "@mui/material";

const NoEncontradoPage = ({ mensaje = "La página que buscas no existe." }) => (
  <div className="pagina">
    <title>No encontrado | Rincones Boyacá</title>
    <Paper sx={{ p: 5, textAlign: "center", borderRadius: 3 }}>
      <Typography variant="h5" component="h1" sx={{ mb: 1 }}>No encontrado</Typography>
      <Typography sx={{ mb: 3 }}>{mensaje}</Typography>
      <Button component={Link} to="/" variant="contained" color="success">Volver al mapa</Button>
    </Paper>
  </div>
);

export default NoEncontradoPage;

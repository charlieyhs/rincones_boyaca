import { Link } from "react-router";
import { Box, Card, CardActionArea, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import { CalendarMonth, Place } from "@mui/icons-material";
import { formatearPrecio, textoDuracion } from "../../utils/planes";
import { truncar } from "../../utils/texto";

const TarjetaPlan = ({ plan }) => (
  <Card sx={{ height: "100%", borderRadius: 3, boxShadow: 3 }}>
    <CardActionArea
      component={Link}
      to={`/planes/${plan.slug}`}
      sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "stretch" }}
    >
      <CardMedia component="img" image={plan.imagen} alt={plan.titulo} sx={{ height: 180 }} loading="lazy" />
      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Chip size="small" icon={<CalendarMonth />} label={textoDuracion(plan.duracionDias)} />
          <Chip size="small" icon={<Place />} label={`${plan.paradas.length} paradas`} />
          {plan.demo && <Chip size="small" color="warning" variant="outlined" label="Ejemplo" />}
        </Box>
        <Typography variant="h6" component="h3" sx={{ fontWeight: "bold", lineHeight: 1.3 }}>
          {plan.titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {plan.empresa?.nombre}
        </Typography>
        <Typography variant="body2" sx={{ flex: 1 }}>
          {truncar(plan.resumen, 130)}
        </Typography>
        <Typography variant="subtitle1" color="success.main" sx={{ fontWeight: "bold" }}>
          {formatearPrecio(plan.precio)}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default TarjetaPlan;

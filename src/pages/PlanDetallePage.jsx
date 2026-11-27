import { Fragment } from "react";
import { Link, useParams } from "react-router";
import {
  Box, Button, Chip, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Tooltip, Typography,
} from "@mui/material";
import {
  ArrowBack, CalendarMonth, Cancel, CheckCircle, Directions, Place, Schedule, TrendingUp, Verified, WhatsApp,
} from "@mui/icons-material";
import MapaPlan from "../components/planes/MapaPlan";
import NoEncontradoPage from "./NoEncontradoPage";
import {
  distanciaKm, formatearPrecio, obtenerPlan, paradasPorDia, textoDuracion, urlRutaGoogleMaps,
} from "../utils/planes";
import { colorCategoria } from "../utils/mapsUtil";

const urlWhatsApp = (numero, titulo) =>
  `https://wa.me/${numero}?text=${encodeURIComponent(
    `Hola, me interesa el plan "${titulo}" que vi en Rincones Boyacá.`
  )}`;

const Seccion = ({ titulo, children }) => (
  <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, mb: 3 }}>
    <Typography variant="h6" component="h2" sx={{ fontWeight: "bold", color: "success.main", mb: 2 }}>
      {titulo}
    </Typography>
    {children}
  </Paper>
);

const Parada = ({ parada }) => {
  const { sitio } = parada;
  const color = colorCategoria(sitio.categoria);
  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
      <Box
        sx={{
          flexShrink: 0, width: 32, height: 32, borderRadius: "50%", bgcolor: "success.main", color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold",
        }}
      >
        {parada.numero}
      </Box>
      <Box
        component="img"
        src={sitio.imagen}
        alt={sitio.nombre}
        loading="lazy"
        sx={{ width: { xs: 72, sm: 110 }, height: { xs: 72, sm: 80 }, objectFit: "cover", borderRadius: 2, flexShrink: 0 }}
      />
      <Box sx={{ minWidth: 0 }}>
        <Typography
          component={Link}
          to={`/sitios/${sitio.id}`}
          sx={{ fontWeight: "bold", color: "text.primary", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
        >
          {sitio.nombre}
        </Typography>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap", my: 0.5 }}>
          <Chip size="small" label={sitio.categoria} sx={{ bgcolor: color, color: "#fff" }} />
          <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Schedule fontSize="small" /> {parada.duracion}
          </Typography>
        </Box>
        {parada.nota && <Typography variant="body2">{parada.nota}</Typography>}
      </Box>
    </Box>
  );
};

const Trayecto = ({ desde, hasta }) => (
  <Typography variant="caption" color="text.secondary" sx={{ display: "block", ml: "15px", pl: 3, py: 1, borderLeft: "2px dashed", borderColor: "divider" }}>
    ≈ {distanciaKm(desde.sitio.coords, hasta.sitio.coords).toFixed(1)} km en línea recta
  </Typography>
);

const PlanDetallePage = () => {
  const { slug } = useParams();
  const plan = obtenerPlan(slug);

  if (!plan) return <NoEncontradoPage mensaje="Este plan no existe o ya no está publicado." />;

  const { empresa, paradas } = plan;
  const dias = paradasPorDia(paradas);
  const rutaGoogle = urlRutaGoogleMaps(paradas);

  return (
    <div className="pagina">
      <title>{`${plan.titulo} | Rincones Boyacá`}</title>

      <Button component={Link} to="/planes" startIcon={<ArrowBack />} color="success" sx={{ mb: 2 }}>
        Todos los planes
      </Button>

      {/* Portada */}
      <Box
        sx={{
          position: "relative", borderRadius: 3, overflow: "hidden", mb: 3, minHeight: { xs: 220, sm: 320 },
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,.75), rgba(0,0,0,.1)), url(${plan.imagen})`,
          backgroundSize: "cover", backgroundPosition: "center", color: "#fff",
          display: "flex", flexDirection: "column", justifyContent: "flex-end", p: { xs: 2, sm: 4 },
        }}
      >
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}>
          <Chip icon={<CalendarMonth />} label={textoDuracion(plan.duracionDias)} sx={{ bgcolor: "rgba(255,255,255,.9)" }} />
          <Chip icon={<Place />} label={`${paradas.length} paradas`} sx={{ bgcolor: "rgba(255,255,255,.9)" }} />
          {plan.dificultad && (
            <Chip icon={<TrendingUp />} label={`Dificultad ${plan.dificultad.toLowerCase()}`} sx={{ bgcolor: "rgba(255,255,255,.9)" }} />
          )}
          {plan.demo && <Chip color="warning" label="Plan de ejemplo" />}
        </Box>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", fontSize: { xs: "1.6rem", sm: "2.2rem" } }}>
          {plan.titulo}
        </Typography>
        {empresa && <Typography sx={{ opacity: 0.9 }}>Por {empresa.nombre}</Typography>}
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Seccion titulo="Sobre este plan">
            <Typography sx={{ lineHeight: 1.7 }}>{plan.resumen}</Typography>
          </Seccion>

          <Seccion titulo="Ruta del recorrido">
            <Box sx={{ height: { xs: 300, sm: 420 } }}>
              <MapaPlan paradas={paradas} />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1, flexWrap: "wrap", mt: 2 }}>
              <Typography variant="caption" color="text.secondary">
                La línea punteada muestra el orden de las paradas, no la vía exacta.
              </Typography>
              {rutaGoogle && (
                <Button
                  component="a" href={rutaGoogle} target="_blank" rel="noopener noreferrer"
                  variant="outlined" color="success" startIcon={<Directions />}
                >
                  Abrir ruta en Google Maps
                </Button>
              )}
            </Box>
          </Seccion>

          <Seccion titulo="Itinerario">
            {dias.map(({ dia, paradas: paradasDia }, i) => (
              <Box key={dia} sx={{ mb: i < dias.length - 1 ? 3 : 0 }}>
                {plan.duracionDias > 1 && (
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1.5 }}>Día {dia}</Typography>
                )}
                {paradasDia.map((parada, j) => (
                  <Fragment key={parada.numero}>
                    {j > 0 && <Trayecto desde={paradasDia[j - 1]} hasta={parada} />}
                    <Parada parada={parada} />
                  </Fragment>
                ))}
              </Box>
            ))}
          </Seccion>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, borderRadius: 3, position: { md: "sticky" }, top: { md: 16 } }}>
            <Typography variant="overline" color="text.secondary">Precio</Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "success.main", mb: 2 }}>
              {formatearPrecio(plan.precio)}
            </Typography>

            {empresa?.whatsapp ? (
              <Button
                component="a" href={urlWhatsApp(empresa.whatsapp, plan.titulo)} target="_blank" rel="noopener noreferrer"
                fullWidth size="large" variant="contained" color="success" startIcon={<WhatsApp />}
              >
                Reservar por WhatsApp
              </Button>
            ) : (
              <Tooltip title="Este es un plan de ejemplo: todavía no tiene un operador real para contactar.">
                <span>
                  <Button fullWidth size="large" variant="contained" color="success" startIcon={<WhatsApp />} disabled>
                    Reservar por WhatsApp
                  </Button>
                </span>
              </Tooltip>
            )}

            {plan.puntoEncuentro && (
              <Typography variant="body2" sx={{ mt: 2, display: "flex", gap: 1 }}>
                <Place fontSize="small" color="error" /> <span><strong>Punto de encuentro:</strong> {plan.puntoEncuentro}</span>
              </Typography>
            )}

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>Incluye</Typography>
            <List dense disablePadding>
              {plan.incluye.map((item) => (
                <ListItem key={item} disableGutters>
                  <ListItemIcon sx={{ minWidth: 30 }}><CheckCircle fontSize="small" color="success" /></ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>

            {plan.noIncluye?.length > 0 && (
              <>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold", mt: 1 }}>No incluye</Typography>
                <List dense disablePadding>
                  {plan.noIncluye.map((item) => (
                    <ListItem key={item} disableGutters>
                      <ListItemIcon sx={{ minWidth: 30 }}><Cancel fontSize="small" color="disabled" /></ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </>
            )}

            {empresa && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="overline" color="text.secondary">Operador</Typography>
                <Typography sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 0.5 }}>
                  {empresa.nombre}
                  {empresa.verificada && (
                    <Tooltip title="Empresa verificada"><Verified fontSize="small" color="primary" /></Tooltip>
                  )}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{empresa.descripcion}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
                  RNT: {empresa.rnt ?? "pendiente de verificación"}
                </Typography>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default PlanDetallePage;

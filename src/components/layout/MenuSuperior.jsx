import { useState } from "react";
import { Link, NavLink } from "react-router";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import { Close, Landscape, Menu } from "@mui/icons-material";
import { SECCIONES } from "./secciones";

const Marca = ({ onClick }) => (
  <Box
    component={Link}
    to="/"
    onClick={onClick}
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1,
      color: "inherit",
      textDecoration: "none",
      minWidth: 0,
    }}
  >
    <Landscape aria-hidden="true" />
    <Box sx={{ minWidth: 0 }}>
      <Typography component="span" sx={{ display: "block", fontWeight: 700, fontSize: "1.2rem", lineHeight: 1.2 }}>
        Rincones Boyacá
      </Typography>
      <Typography
        component="span"
        sx={{ display: { xs: "none", md: "block" }, fontSize: "0.75rem", opacity: 0.85, lineHeight: 1.2 }}
      >
        Descubre la belleza de nuestros paisajes
      </Typography>
    </Box>
  </Box>
);

const MenuSuperior = () => {
  const [abierto, setAbierto] = useState(false);
  const conScroll = useScrollTrigger({ disableHysteresis: true, threshold: 0 });

  const cerrar = () => setAbierto(false);

  return (
    <>
      <a href="#contenido" className="saltar-contenido">Saltar al contenido</a>

      <AppBar
        position="sticky"
        elevation={conScroll ? 4 : 0}
        sx={{
          background: "linear-gradient(135deg, var(--verde-boyaca) 0%, var(--verde-boyaca-light) 100%)",
          color: "var(--blanco)",
        }}
      >
        <Toolbar sx={{ gap: 2, width: "100%", maxWidth: 1200, mx: "auto", px: { xs: 2, sm: 3 } }}>
          <Marca />

          <Box
            component="nav"
            aria-label="Secciones"
            sx={{ display: { xs: "none", sm: "flex" }, gap: 0.5, ml: "auto" }}
          >
            {SECCIONES.map(({ to, label, icono: Icono, end }) => (
              <Button
                key={to}
                component={NavLink}
                to={to}
                end={end}
                startIcon={<Icono />}
                sx={{
                  color: "inherit",
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 999,
                  px: 2,
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.15)" },
                  "&.active": { bgcolor: "var(--blanco)", color: "var(--verde-boyaca)" },
                  "&:focus-visible": { outline: "2px solid var(--blanco)", outlineOffset: 2 },
                }}
              >
                {label}
              </Button>
            ))}
          </Box>

          <IconButton
            color="inherit"
            edge="end"
            aria-label="Abrir menú"
            aria-controls="menu-movil"
            aria-expanded={abierto}
            onClick={() => setAbierto(true)}
            sx={{ display: { xs: "inline-flex", sm: "none" }, ml: "auto" }}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        id="menu-movil"
        anchor="right"
        open={abierto}
        onClose={cerrar}
        slotProps={{ paper: { sx: { width: 280 } } }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            bgcolor: "success.main",
            color: "#fff",
          }}
        >
          <Marca onClick={cerrar} />
          <IconButton color="inherit" aria-label="Cerrar menú" onClick={cerrar}>
            <Close />
          </IconButton>
        </Box>
        <nav aria-label="Secciones">
          <List>
            {SECCIONES.map(({ to, label, icono: Icono, end }) => (
              <ListItemButton
                key={to}
                component={NavLink}
                to={to}
                end={end}
                onClick={cerrar}
                sx={{
                  "&.active": { bgcolor: "rgba(27, 94, 32, 0.1)", color: "success.main" },
                  "&.active .MuiListItemIcon-root": { color: "success.main" },
                }}
              >
                <ListItemIcon><Icono /></ListItemIcon>
                <ListItemText primary={label} slotProps={{ primary: { sx: { fontWeight: 600 } } }} />
              </ListItemButton>
            ))}
          </List>
        </nav>
      </Drawer>
    </>
  );
};

export default MenuSuperior;

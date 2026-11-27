import styles from "./InfoSito.module.css"
import { Close, Hiking } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Zoom,
  useMediaQuery,
} from "@mui/material";

import InfoSitio from "./InfoSitio";
import ComoLlegar from "./ComoLlegar";
import { useState } from "react";
import { Link } from "react-router";
import { colorCategoria } from "../../../utils/mapsUtil";

const DialogInfoSitio = ({ sitio, open, onClose, onVerEnMapa }) => {
  const [comoLlegar, setComoLlegar] = useState(false);
  const color = colorCategoria(sitio.categoria);
  const pantallaPequena = useMediaQuery("(max-width: 768px)");

  const abrirDialogoRuta = () => {
    setComoLlegar(true);
  };

  const verInformacion = () => {
    setComoLlegar(false);
  };

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
        {comoLlegar ? <ComoLlegar sitio={sitio} /> : <InfoSitio sitio={sitio} />}
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 1, flexWrap: "wrap" }}>
        <Button
          component={Link}
          to={`/sitios/${sitio.id}`}
          sx={{ color, mr: "auto" }}
        >
          Ficha completa y planes
        </Button>
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
          onClick={comoLlegar ? verInformacion : abrirDialogoRuta}
          sx={{
            backgroundColor: color,
            "&:hover": {
              backgroundColor: color,
              filter: "brightness(0.9)",
            },
          }}
        >
          {comoLlegar ? "Ver Información" : "Cómo llegar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};


export default DialogInfoSitio;
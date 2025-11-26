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
} from "@mui/material";

import PropTypes from "prop-types";
import InfoSitio from "./InfoSitio";
import ComoLlegar from "./ComoLlegar";
import { useState } from "react";
const COLOR_DEFECTO = "#66bb6a";

const DialogInfoSitio = ({ sitio, open, onClose }) => {
  const [comoLlegar, setComoLlegar] = useState(false);
  
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
      fullScreen={window.innerWidth <= 768}
      slotProps={{
        paper: {
          sx: {
            background: "linear-gradient(145deg, #0a2a1d 0%, #143b2b 100%)",
            color: "#fff",
            borderRadius: 3,
            border: `1px solid ${sitio?.color || COLOR_DEFECTO}40`,
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
              backgroundColor: `${sitio.color || ""}20`,
              color: sitio.color || COLOR_DEFECTO,
            }}
          >
            <Hiking />
          </Box>
          <Box>
            <h2 style={{color: sitio.color || COLOR_DEFECTO, fontWeight: "bold"}}>
              {sitio.nombre}
            </h2>
            <Chip
              label={sitio.categoria}
              size="small"
              sx={{
                backgroundColor: sitio.color || COLOR_DEFECTO,
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

      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button
          variant="contained"
          onClick={comoLlegar ? verInformacion : abrirDialogoRuta}
          sx={{
            backgroundColor: sitio.color || COLOR_DEFECTO,
            "&:hover": {
              backgroundColor: sitio.color || COLOR_DEFECTO,
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

DialogInfoSitio.propTypes = {
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

export default DialogInfoSitio;
import { CleaningServices, ExpandMore, Search } from "@mui/icons-material"; 
import { 
  Accordion, 
  AccordionDetails, 
  AccordionSummary, 
  Button, 
  Checkbox, 
  FormControlLabel, 
  FormGroup,
  InputAdornment, 
  TextField, 
  Typography,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { useMapFilters } from "../../hooks/useMapFilters";
import styles from "./mapa.module.css";
import { VERDE_BOYACA } from "../../constants";
import { useState } from "react";
import { coloresCategorias } from "../../utils/mapsUtil";
import PropTypes from "prop-types";

const MapFilters = ({ open, onClose }) => {

  const {aplicarFiltros, limpiarFiltros} = useMapFilters();
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [categorias, setCategorias] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChangeCategoria = (id) => {
    setCategorias((prev) => 
      prev.includes(id) 
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const handleAplicarFiltros = () => {
    const filtros = {
      textoBusqueda,
      categorias
    };
    aplicarFiltros(filtros);
    if (isMobile) {
      onClose();
    }
  };

  const handleLimpiarFiltros = () => {
    setTextoBusqueda('');
    setCategorias([]);
    limpiarFiltros();
  };

  return (
    <aside className={`${styles.sidebar} ${open ? '' : styles.close}`}>
      <h4 style={{marginBottom: '5px'}}>Filtros</h4>
      <div className={styles.searchContainer}>
        {/* Buscador */}
        <TextField
          className={styles.searchInput}
          placeholder="Buscar sitios turísticos..."
          value={textoBusqueda}
          color="success"
          onChange={(e) => setTextoBusqueda(e.target.value)}
          sx={{
            mb: '8px',
            "& .MuiInputBase-input": {
              padding: '5px',
            }
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Categorias */}
        <Accordion 
          elevation={0}
          square
          disableGutters
          sx={{ 
            m: 0,
            boxShadow: 'none',
            '&:before': { display: 'none' },
            borderTop: '0.5px solid #dbe0e6'
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore/>}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
    		      minHeight: 0,
		          padding: '4px 0',
		          '& .MuiAccordionSummary-content': {
		          margin: 0,
		        },
	        }}>
              <Typography component="span">Categorias</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              pt: 0,
            }}
          >
            {/* Categorías */}
            <div className={styles.filter_container}>
              <FormGroup className={styles.wraper_checkbox}>
                {coloresCategorias.map((cat) => {
                  return (
                    <FormControlLabel 
                      sx={{
                          margin: 0,
                          padding: 0,
                      }}
                      key={cat.id}
                      control={<Checkbox
                          checked={categorias.includes(cat.id)}
                          onChange={() => handleChangeCategoria(cat.id)}
                          sx={{
                            borderColor: cat.color,
                            color: cat.color,
                            padding: '2px',
                          }}
                        />}
                      label={cat.label}
                    />
                  );
                })}
              </FormGroup>
            </div>
          </AccordionDetails>
        </Accordion>
        
      </div>
      
      <div className={styles.footer_filtros}>
        <Button
          onClick={handleAplicarFiltros}
          color="success"
          aria-label="Buscando resultados"
          startIcon={<Search />}
          variant="contained">
            Aplicar
        </Button>

        <Button
          onClick={handleLimpiarFiltros}
          aria-label="Limpiar filtros"
          startIcon={<CleaningServices />}
          variant="outlined"
          sx={{borderColor: VERDE_BOYACA, color: VERDE_BOYACA}}>
            Limpiar
        </Button>
      </div>
    </aside>
  );
};

MapFilters.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired, // Agregar onClose a propTypes
};

export default MapFilters;
import { CleaningServices, ExpandMore, Search } from "@mui/icons-material";
import { Accordion, 
  AccordionDetails, 
  AccordionSummary, 
  Button, 
  Checkbox, 
  FormControlLabel, 
  FormGroup,
  InputAdornment, 
  TextField, 
  Typography, 
} from "@mui/material";
import { useMapFilters } from "../../hooks/useMapFilters";
import styles from "./mapa.module.css";
import { VERDE_BOYACA } from "../../constants";
import { useState } from "react";
import { coloresCategorias } from "../../utils/mapsUtil";
import PropTypes from "prop-types";

const MapFilters = ({open}) => {

  const {aplicarFiltros, limpiarFiltros} = useMapFilters();
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [categorias, setCategorias] = useState([]);

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
  };
  const handleLimpiarFiltros = () => {
    setTextoBusqueda('');
    setCategorias([])
    limpiarFiltros();
  };

  return (
    <aside className={`${styles.sidebar} ${open ? '' : styles.close}`}>
      
      <div className={styles.searchContainer}>
        {/* Buscador */}
        <TextField
          className={styles.searchInput}
          placeholder="Buscar sitios turísticos..."
          value={textoBusqueda}
          color="success"
          onChange={(e) => setTextoBusqueda(e.target.value)}
          sx={{mb: '8px'}}
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
            id="panel1-header">
              <Typography component="span">Categorias</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* Categorías */}
            <div className={styles.filter_container}>
              <FormGroup
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
              >
                {coloresCategorias.map((cat) => {
                  return (
                    <FormControlLabel 
                      key={cat.id}
                      control={<Checkbox
                          checked={categorias.includes(cat.id)}
                          onChange={() => handleChangeCategoria(cat.id)}
                          style={{
                            borderColor: cat.color,
                            color: cat.color,
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
          onClick={() => handleAplicarFiltros()}
          color="success"
          aria-label="Buscando resultados"
          startIcon={<Search />}
          variant="contained">
            Aplicar filtros
        </Button>

        <Button
          onClick={() => handleLimpiarFiltros()}
          aria-label="Limpiar filtros"
          startIcon={<CleaningServices />}
          variant="outlined"
          sx={{borderColor: VERDE_BOYACA, color: VERDE_BOYACA}}>
            Limpiar filtros
        </Button>
        
      </div>
    </aside>
  );
};
MapFilters.propTypes = {
  open: PropTypes.bool.isRequired,
};
export default MapFilters;

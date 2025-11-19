import { CleaningServices, ExpandMore, MenuOpen, Search } from "@mui/icons-material";
import { Accordion, 
  AccordionDetails, 
  AccordionSummary, 
  Button, 
  Checkbox, 
  FormControlLabel, 
  FormGroup, 
  IconButton, 
  InputAdornment, 
  TextField, 
  Typography } from "@mui/material";
import { useMapFilters } from "../../hooks/useMapFilters";
import styles from "./mapa.module.css";
import { VERDE_BOYACA } from "../../constants";

const MapFilters = () => {
  const {
    coloresCategorias,
    searchTerm,
    setSearchTerm,
  } = useMapFilters();

  return (
    <aside className={styles.contenedor_filtros}>
      <div className={styles.header_filtros}>
        <h3>Filtros</h3>
        <IconButton style={{padding: '6px 8px'}}>
          <MenuOpen />
        </IconButton>
      </div>
      <div className={styles.searchContainer}>
        {/* Buscador */}
        
        <TextField
          className={styles.searchInput}
          placeholder="Buscar sitios turísticos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
          onClick={() => console.log('Buscando...')}
          color="success"
          aria-label="Buscando resultados"
          startIcon={<Search />}
          variant="contained">
            Aplicar filtros
        </Button>

        <Button
          onClick={() => console.log('Limpiando...')}
          aria-label="Buscando resultados"
          startIcon={<CleaningServices />}
          variant="outlined"
          sx={{borderColor: VERDE_BOYACA, color: VERDE_BOYACA}}>
            Limpiar filtros
        </Button>

      </div>
    </aside>
  );
};

export default MapFilters;

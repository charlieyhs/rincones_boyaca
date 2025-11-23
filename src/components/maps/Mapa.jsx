import { useState, useCallback } from "react"; // Agregar useEffect
import MapFilters from "./MapFilters";
import MapView from "./MapView";
import CartasLugares from "./CartasLugares";
import styles from "./mapa.module.css";
import InfoSitio from "./dialogs/InfoSitio";
import { useMapFilters } from "../../hooks/useMapFilters";
import { MapFiltersProvider } from "../../providers/MapFiltersProvider";
import { Button, IconButton, useMediaQuery, useTheme} from "@mui/material";
import { List, Map, MenuOpen } from "@mui/icons-material";
import ViewMode from "./toggle/ViewMode";

function MapaCore() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { sitiosFiltrados } = useMapFilters();

  const [openInfoSitio, setOpenInfoSitio] = useState(false);
  const [sitio, setSitio] = useState(null);
  const [viewMode, setViewMode] = useState("map");
  const [openFilters, setOpenFilters] = useState(false);


  const toggleFilters = useCallback(() => {
    setOpenFilters(prev => !prev);
  }, []);

  const handleOpenInfoSitio = useCallback((sitio) => {
    setSitio(sitio);
    setOpenInfoSitio(true);
  }, []);

  const handleCloseInfoSitio = useCallback(() => {
    setOpenInfoSitio(false);
  }, []);

  const handleViewModeChange = (mode) => {
    setViewMode(mode); 
  };

  return (
    <div className={styles.mapContainer}>
      
      <div className={styles.header_main}>
        <IconButton
          title="Filtros"
          className={styles.boton_filtros}
          onClick={toggleFilters}
        >
          <MenuOpen />
        </IconButton>

        {/* Contador */}
        <p className={styles.resultsCount}>
          {sitiosFiltrados.length} sitios encontrados
        </p>

        {/* Switch vista */}
        <div style={{display: 'flex', gap: '5px'}}>
          {isMobile ? <ViewMode viewMode={viewMode} handleViewModeChange={handleViewModeChange} />
            : <>
              <Button
                onClick={() => handleViewModeChange("map")}
                aria-label="Vista mapa"
                startIcon={<Map />}
                color="success"
                variant={viewMode === "map" ? "contained" : "outlined"}>
                  Mapa
              </Button>

              <Button
                onClick={() => handleViewModeChange("list")}
                startIcon={<List/>}
                color="success"
                variant={viewMode === "list" ? "contained" : "outlined"}
              >
                Lista
              </Button>
            </>
          }
        </div>
      </div>

      <MapFilters open={openFilters} onClose={toggleFilters} /> {/* Pasar onClose */}

      {/* Mapa o lista */}
      {viewMode === "map" ? (
        <MapView sitios={sitiosFiltrados} onOpenInfo={handleOpenInfoSitio} />
      ) : (
        <CartasLugares 
          openFilters={openFilters} 
          sitiosFiltrados={sitiosFiltrados} 
          handleOpenInfoSitio={handleOpenInfoSitio} 
        />
      )}
      
      {openInfoSitio && (
        <InfoSitio
          open={openInfoSitio}
          sitio={sitio}
          onClose={handleCloseInfoSitio}
        />
      )}
    </div>
  );
}

export default function Mapa() {
  return (
    <MapFiltersProvider>
      <MapaCore />
    </MapFiltersProvider>
  );
}
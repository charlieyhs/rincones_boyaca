import { useState, useCallback } from "react";
import MapFilters from "./MapFilters";
import MapView from "./MapView";
import CartasLugares from "./CartasLugares";
import styles from "./mapa.module.css";
import InfoSitio from "./dialogs/InfoSitio";
import { useMapFilters } from "../../hooks/useMapFilters";
import { MapFiltersProvider } from "../../providers/MapFiltersProvider";
import { Button, IconButton} from "@mui/material";
import { List, Map, MenuOpen } from "@mui/icons-material";

function MapaCore() {
  const { sitiosFiltrados } = useMapFilters();

  const [openInfoSitio, setOpenInfoSitio] = useState(false);
  const [sitio, setSitio] = useState(null);
  const [viewMode, setViewMode] = useState("map");
  const [openFilters, setOpenFilters] = useState(false);

  const handleOpenInfoSitio = useCallback((sitio) => {
    setSitio(sitio);
    setOpenInfoSitio(true);
  }, []);

  const handleCloseInfoSitio = useCallback(() => {
    setOpenInfoSitio(false);
  }, []);

  return (
    <div className={styles.mapContainer}>
      
      <div className={styles.header_main}>
        <IconButton
          title="Filtros"
          className={styles.filtros_float_button}
          onClick={() => setOpenFilters(!openFilters)}
        >
          <MenuOpen />
        </IconButton>

        {/* Contador */}
        <p className={styles.resultsCount}>
          {sitiosFiltrados.length} sitios encontrados
        </p>

        {/* Switch vista */}
        <div style={{display: 'flex', gap: '5px'}}>
          <Button
            onClick={() => setViewMode("map")}
            aria-label="Vista mapa"
            startIcon={<Map />}
            color="success"
            variant={viewMode === "map" ? "contained" : "outlined"}>
              Mapa
          </Button>

          <Button
            onClick={() => setViewMode("list")}
            startIcon={<List/>}
            color="success"
            variant={viewMode === "list" ? "contained" : "outlined"}
          >
            Lista
          </Button>
        </div>
      </div>

      <MapFilters open={openFilters} />

      {/* Mapa o lista */}
      {viewMode === "map" ? (
        <MapView sitios={sitiosFiltrados} onOpenInfo={handleOpenInfoSitio} />
      ) : (
        <CartasLugares openFilters={openFilters} sitiosFiltrados={sitiosFiltrados} handleOpenInfoSitio={handleOpenInfoSitio} />
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

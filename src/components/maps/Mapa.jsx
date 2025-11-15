import { useState, useCallback } from "react";
import MapFilters from "./MapFilters";
import MapView from "./MapView";
import CartasLugares from "./CartasLugares";
import styles from "./mapa.module.css";
import InfoSitio from "./dialogs/InfoSitio";
import { useMapFilters } from "../../hooks/useMapFilters";
import { MapFiltersProvider } from "../../providers/MapFiltersProvider";
import { Button } from "@mui/material";
import { List, Map } from "@mui/icons-material";

function MapaCore() {
  const { sitiosFiltrados } = useMapFilters();

  const [openInfoSitio, setOpenInfoSitio] = useState(false);
  const [sitio, setSitio] = useState(null);
  const [viewMode, setViewMode] = useState("map");

  const handleOpenInfoSitio = useCallback((sitio) => {
    setSitio(sitio);
    setOpenInfoSitio(true);
  }, []);

  const handleCloseInfoSitio = useCallback(() => {
    setOpenInfoSitio(false);
  }, []);

  return (
    <div className={styles.mapContainer}>
      
      <MapFilters />

      <main style={{flex: 1}}>
        <div className={styles.header_main}>
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
              className={`${styles.view_button} ${viewMode === "map" ? styles.active : ""}`}>
                Mapa
            </Button>

            <Button
              onClick={() => setViewMode("list")}
              startIcon={<List/>}
              className={`${styles.view_button} ${viewMode === "list" ? styles.active : ""}`}
            >
              Lista
            </Button>
          </div>
        </div>

        {/* Mapa o lista */}
        {viewMode === "map" ? (
          <MapView sitios={sitiosFiltrados} onOpenInfo={handleOpenInfoSitio} />
        ) : (
          <CartasLugares sitiosFiltrados={sitiosFiltrados} handleOpenInfoSitio={handleOpenInfoSitio} />
        )}
      </main>
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

import { useCallback, useMemo, useState } from "react";
import { MapFiltersContext } from "../context/MapFiltersContext";
import PropTypes from "prop-types";
import { sitiosTuristicos } from "../data/sitios";
import { colorsList } from "../utils/mapsUtil";

export function MapFiltersProvider({ children }) {
  const [filtroCategoria, setFiltroCategoria] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleFiltro = useCallback((categoria) => {
    setFiltroCategoria((prev) => (prev === categoria ? null : categoria));
  }, []);

  const sitiosFiltrados = useMemo(() => {
    let filtered = sitiosTuristicos;

    if (filtroCategoria)
      filtered = filtered.filter((s) => s.categoria === filtroCategoria);

    if (searchTerm)
      filtered = filtered.filter((s) =>
        [s.nombre, s.descripcion, s.ubicacion]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );

    return filtered;
  }, [filtroCategoria, searchTerm]);
  
  const value = useMemo(() => ({
    colorsList,
    filtroCategoria,
    toggleFiltro,
    searchTerm,
    setSearchTerm,
    sitiosFiltrados,
    totalSitios: sitiosTuristicos
}), [
    filtroCategoria,
    toggleFiltro,
    searchTerm,
    sitiosFiltrados
]);

  return (
    <MapFiltersContext.Provider
      value={value}
    >
      {children}
    </MapFiltersContext.Provider>
  );
}

MapFiltersProvider.propTypes = {
    children : PropTypes.node.isRequired,
};


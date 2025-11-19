import { useMemo, useState } from "react";
import { MapFiltersContext } from "../context/MapFiltersContext";
import PropTypes from "prop-types";
import { sitiosTuristicos } from "../data/sitios";
import { coloresCategorias } from "../utils/mapsUtil";

export function MapFiltersProvider({ children }) {
  const [filtroCategoria, setFiltroCategoria] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
    coloresCategorias,
    filtroCategoria,
    setFiltroCategoria,
    searchTerm,
    setSearchTerm,
    sitiosFiltrados,
    totalSitios: sitiosTuristicos
}), [
    filtroCategoria,
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


import { useMemo, useState } from "react";
import { MapFiltersContext } from "../context/MapFiltersContext";
import PropTypes from "prop-types";
import { sitiosTuristicos } from "../data/sitios";

export function MapFiltersProvider({ children }) {
  const [filtroCategoria, setFiltroCategoria] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const sitiosFiltrados = useMemo(() => {
    let filtered = sitiosTuristicos;

    if (filtroCategoria?.length > 0)
      filtered = filtered.filter((s) => filtroCategoria.includes(s.categoria));

    if (searchTerm)
      filtered = filtered.filter((s) =>
        [s.nombre, s.descripcion, s.ubicacion]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );

    return filtered;
  }, [filtroCategoria, searchTerm]);

  const aplicarFiltros = (filtros) => {
    setSearchTerm(filtros.textoBusqueda);
    setFiltroCategoria(filtros.categorias);

  };
  const limpiarFiltros = () => {
    setSearchTerm(null);
    setFiltroCategoria(null);
  }
  const value = useMemo(() => ({
    sitiosFiltrados,
    aplicarFiltros,
    limpiarFiltros,
  }), [sitiosFiltrados]);

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


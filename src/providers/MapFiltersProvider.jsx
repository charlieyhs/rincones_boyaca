import { useMemo, useState } from "react";
import { MapFiltersContext } from "../context/MapFiltersContext";
import { sitiosTuristicos } from "../data/sitios";
import { normalizarTexto } from "../utils/texto";

export function MapFiltersProvider({ children }) {
  const [filtroCategoria, setFiltroCategoria] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const sitiosFiltrados = useMemo(() => {
    let filtered = sitiosTuristicos;

    if (filtroCategoria?.length > 0)
      filtered = filtered.filter((s) => filtroCategoria.includes(s.categoria));

    const busqueda = normalizarTexto(searchTerm?.trim());
    if (busqueda)
      filtered = filtered.filter((s) =>
        normalizarTexto([s.nombre, s.descripcion, s.ubicacion].join(" "))
          .includes(busqueda)
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



import { useContext } from "react";
import { MapFiltersContext } from "../context/MapFiltersContext";

export function useMapFilters() {
  return useContext(MapFiltersContext);
}
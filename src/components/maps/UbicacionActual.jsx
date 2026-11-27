import { useEffect } from "react";
import { useMap } from "react-leaflet";

const UbicacionActual = ({position}) => {
  const map = useMap();

  useEffect(() => {
    if(position){
      map.flyTo(position, 12);
    }

  }, [position, map]);

  return null;
}


export default UbicacionActual;
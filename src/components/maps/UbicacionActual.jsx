import PropTypes from "prop-types";
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

UbicacionActual.propTypes = {
  position: PropTypes.array
};

export default UbicacionActual;
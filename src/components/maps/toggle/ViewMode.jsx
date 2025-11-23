import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import PropTypes from "prop-types";

const ViewMode = ({ viewMode, handleViewModeChange }) => {
  const checked = viewMode === "map";

  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          color="success"
          onChange={() => handleViewModeChange(checked ? "list" : "map")}
        />
      }
      label={checked ? "Mapa" : "Lista"}
    />
  );
};

ViewMode.propTypes = {
  viewMode: PropTypes.string,
  handleViewModeChange: PropTypes.func,
};

export default ViewMode;
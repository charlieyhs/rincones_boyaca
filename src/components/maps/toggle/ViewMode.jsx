import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

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


export default ViewMode;
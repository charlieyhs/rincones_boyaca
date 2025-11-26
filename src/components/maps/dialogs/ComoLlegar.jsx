import { Dialog } from "@mui/material";
import PropTypes from "prop-types";

const ComoLlegar = ({open, onClose}) => {

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >

        </Dialog>
    );
};
ComoLlegar.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}
export default ComoLlegar;
import 'bootstrap/dist/css/bootstrap.css';
import {Fab} from "@mui/material";
import {Forum} from "@mui/icons-material";

const fabStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    mb: 5
};

function FloatingButton(props) {
    return (
        <Fab
            variant="extended"
            color="primary"
            sx={fabStyle}
            onClick={props.onClick}
        >
            <Forum sx={{ mr: 1 }} />
            Chat
        </Fab>
    );
}

export default FloatingButton;

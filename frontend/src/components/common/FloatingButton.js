import 'bootstrap/dist/css/bootstrap.css';
import {Fab} from "@mui/material";
import {Forum} from "@mui/icons-material";

function FloatingButton(props) {
    return (
        <Fab
            variant="extended"
            color="primary"
            sx={{m: 1}}
            onClick={props.onClick}
        >
            <Forum sx={{ mr: 1 }} />
            Chat
        </Fab>
    );
}

export default FloatingButton;

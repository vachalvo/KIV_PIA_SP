import 'bootstrap/dist/css/bootstrap.css';

import {IconButton} from "@mui/material";
import {
    Brightness4, Brightness7,
} from "@mui/icons-material";

function DarkModeButton(props) {
    const { onChange, mode} = props;

    return (
        <IconButton sx={{ ml: 1 }} onClick={onChange} color="inherit">
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
    );
}

export default DarkModeButton;

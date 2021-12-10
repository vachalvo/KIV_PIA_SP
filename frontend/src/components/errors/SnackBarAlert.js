import {Alert, Snackbar} from "@mui/material";

function SnackBarAlert(props) {
    const { open, onClose, text, severity} = props;

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
            <Alert variant="filled" onClose={onClose} severity={severity} sx={{ width: '100%' }}>
                {text}
            </Alert>
        </Snackbar>
    );
}

export default SnackBarAlert;
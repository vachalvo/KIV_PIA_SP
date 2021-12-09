import {
    Alert, AlertTitle,
    Collapse,
    IconButton,
} from "@mui/material";
import {Close} from "@mui/icons-material";

function AlertDialog(props) {
    const { severity, open, onClose, title, content } = props;

    return (
        <Collapse in={ open }>
            <Alert
                severity={severity}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={onClose}
                    >
                        <Close fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}>
                <AlertTitle><strong>{title}</strong></AlertTitle>
                {content}
            </Alert>
        </Collapse>
    );
}

export default AlertDialog;
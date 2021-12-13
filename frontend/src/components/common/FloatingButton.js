import 'bootstrap/dist/css/bootstrap.css';
import {Box, Fab} from "@mui/material";
import {Forum} from "@mui/icons-material";
import {Badge} from "@material-ui/core";

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
    const { showBadge } = props;

    const renderFloatingButton = () => {
        return (
            <Fab
                variant="extended"
                color="primary"
                onClick={props.onClick}
            >
                <Forum sx={{ mr: 1 }} />
                Chat
            </Fab>
        );
    };

    const renderFloatingButtonWithBadge = () => {
        return (
            <Badge
                color="secondary"
                overlap="circular"
                badgeContent=" "
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {renderFloatingButton()}
            </Badge>
        );
    }

    return (
        <Box sx={fabStyle}>
            {showBadge
                ? renderFloatingButtonWithBadge()
                : renderFloatingButton()
            }
        </Box>

    );
}

export default FloatingButton;

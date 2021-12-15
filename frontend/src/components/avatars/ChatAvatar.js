import 'bootstrap/dist/css/bootstrap.css';
import {Avatar, Badge} from "@mui/material";
import {FemaleOutlined, MaleOutlined} from "@mui/icons-material";
import {blue, pink} from "@mui/material/colors";
import { withStyles } from "@material-ui/core/styles";

const OnlineBadge = withStyles(theme => ({
    badge: {
        backgroundColor: "green",
        color: "green",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "1px solid currentColor",
            content: '""'
        }
    }
}))(Badge);
const OfflineBadge = withStyles(theme => ({
    badge: {
        backgroundColor: "gray",
        color: "gray",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "1px solid currentColor",
            content: '""'
        }
    }
}))(Badge);

function ChatAvatar(props) {
    const {gender, online} = props;

    const renderAvatar = () => {
        return (
            <Avatar sx={{ bgcolor: gender === 'MALE' ? blue[500] : pink[500] }}>
                {gender === 'MALE' ?
                    <MaleOutlined /> : <FemaleOutlined />
                }
            </Avatar>
        );
    };
    const renderOnline = () => {
        return (
            <OnlineBadge
                badgeContent=" "
                overlap='circular'
                variant='dot'
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                {renderAvatar()}
            </OnlineBadge>
        );
    };
    const renderOffline = () => {
        return (
            <OfflineBadge
                badgeContent=" "
                overlap='circular'
                variant='dot'
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                {renderAvatar()}
            </OfflineBadge>
        );
    };

    return (
        <>
            {online ? renderOnline() : renderOffline()}
        </>
    );
}

export default ChatAvatar;

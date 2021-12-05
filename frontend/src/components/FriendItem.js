import 'bootstrap/dist/css/bootstrap.css';
import {IconButton, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {
    CheckOutlined,
    DeleteOutline,
    FileUploadOutlined,
    FileDownloadOutlined,
    BlockOutlined
} from "@mui/icons-material";
import GenderAvatar from "./avatars/GenderAvatar";
import AuthService from "../services/auth-service";
import {useEffect, useState} from "react";

const DEFAULT_USER = {
    id: '',
    name: '',
    email: '',
    gender: 'MALE',
    roles: [{
        name: 'ROLE_USER'
    }]
};

function FriendItem(props) {
    const {item, type, onDelete, onDecision} = props;
    const { sourceUser, endUser } = item;
    const userId = AuthService.getCurrentUserId();

    const [user, setUser] = useState(DEFAULT_USER)

    useEffect(() => {
        setUser(sourceUser.id === userId ? {...endUser} : {...sourceUser});
    },[]);

    const empty = () => {};
    const getButton = (color, Icon, _onClick = empty) => {
        return (
            <IconButton
                edge="end"
                color={color}
                onClick={_onClick}
            >
                <Icon />
            </IconButton>
        );
    }

    const getReceivedRequestButtons = () => {
        return (
            <>
                {getButton("success", CheckOutlined, () => onDecision(item.id, 'ACCEPTED'))}
                {getButton("error", BlockOutlined, () => onDecision(item.id, 'BLOCKED'))}
            </>
        )
    };

    const getButtonByType = (type) => {
        let controlButton;
        switch (type) {
            case "Received requests":
                controlButton = getReceivedRequestButtons();
                break;
            case "Friends":
                controlButton = getButton("primary", FileUploadOutlined);
                // controlButton = getButton("primary", FileDownloadOutlined);
                break;
            default:
                controlButton = <div/>;
                break;
        }

        return <div>
            {controlButton}
            {getButton("error", DeleteOutline, () => { onDelete(item.id, type) })}
        </div>;
    }

    return (
        <>
            <ListItem
                dense={true}
                divider={true}
            >
                <ListItemAvatar>
                    <GenderAvatar gender={user.gender}/>
                </ListItemAvatar>
                <ListItemText
                    primary={user.name}
                    secondary={user.email}
                />
                {getButtonByType(type)}
            </ListItem>
        </>
    );
}

export default FriendItem;

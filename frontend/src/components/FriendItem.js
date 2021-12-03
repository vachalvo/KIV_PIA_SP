import 'bootstrap/dist/css/bootstrap.css';
import {IconButton, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {CheckOutlined, DeleteOutline, ThumbUpAltOutlined} from "@mui/icons-material";
import GenderAvatar from "./avatars/GenderAvatar";

function FriendItem(props) {
    let {item, type} = props;
    const {id, email, gender, name} = item;

    const deleteOnClick = () => {

    };

    const requestConfirmClick = () => {

    };

    const getButton = (color, Icon) => {
        return (
            <IconButton edge="end" color={color}>
                <Icon />
            </IconButton>
        );
    }

    const getButtonByType = (type) => {
        let controlButton;

        switch (type) {
            case "Received requests":
                controlButton = getButton("success", CheckOutlined);
                break;
            default:
                controlButton = <div/>;
                break;
        }

        return <div>
            {controlButton}
            {getButton("error", DeleteOutline, "Delete")}
        </div>;
    }

    return (
        <>
            <ListItem
                dense={true}
                divider={true}
            >
                <ListItemAvatar>
                    <GenderAvatar gender={gender}/>
                </ListItemAvatar>
                <ListItemText
                    primary={name}
                    secondary={email}
                />
                {getButtonByType(type)}
            </ListItem>
        </>
    );
}

export default FriendItem;

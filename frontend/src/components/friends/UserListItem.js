import 'bootstrap/dist/css/bootstrap.css';
import {IconButton, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import GenderAvatar from "../avatars/GenderAvatar";
import {BlockOutlined, CheckOutlined, DeleteOutline, SendOutlined} from "@mui/icons-material";

function UserListItem(props) {
    const { onDelete, onDecision, onSend, onClear, option } = props;
    const {user, source, friendshipType, friendshipId} = option;

    const empty = () => {};
    const getButton = (Icon, color = 'primary', _onClick = empty) => {
        return (
            <IconButton
                edge="end"
                color={color}
                onClick={_onClick}
            >
                <Icon />
            </IconButton>
        );
    } ;

    const getBlockButton = () => {
        return getButton(BlockOutlined, 'error', () => {
            onDecision(friendshipId, 'BLOCKED');
            onClear();
        });
    };

    const getSendRequestButton = () => {
        return getButton(SendOutlined, 'primary', () => {
            onSend(user.id);
            onClear();
        });
    };

    const getAcceptRequestButton = () => {
        return getButton(CheckOutlined, 'success', () => {
            onDecision(friendshipId, 'ACCEPTED');
            onClear();
        });
    };

    const getDeleteButton = (type) => {
        return getButton(DeleteOutline, 'error', () => {
            onDelete(friendshipId, type);
            onClear();
        });
    };

    const getPendingRequestSourceButton = () => {
        return getDeleteButton('Send requests');
    };

    const getPendingRequestEndButton = () => {
        return <div>
                {getAcceptRequestButton()}
                {getBlockButton()}
                {getDeleteButton('Received requests')}
            </div>;
    };

    const getNewFriendButton = () => {
        return getSendRequestButton();
    };

    const renderButton = (type) => {
        switch (type){
            case 'REQUEST_WAITING':
                return source ? getPendingRequestSourceButton() : getPendingRequestEndButton();
            case 'BLOCKED':
                return getDeleteButton('Blocked users');
            default:
                return getNewFriendButton();
        }
    };

    return (
        <ListItem>
            <ListItemAvatar>
                <GenderAvatar gender={user.gender}/>
            </ListItemAvatar>
            <ListItemText
                primary={user.name}
                secondary={user.email}
            />
            {renderButton(friendshipType)}
        </ListItem>
    );
}

export default UserListItem;
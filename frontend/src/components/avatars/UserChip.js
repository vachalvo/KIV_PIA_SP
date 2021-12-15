import * as React from 'react';
import Chip from '@mui/material/Chip';
import {useHistory} from "react-router-dom";
import {Badge, Typography} from "@mui/material";
import ChatAvatar from "./ChatAvatar";
import WebSocketService from "../../services/web-socket-service";
export default function UserChip(props) {
    const {user, showBadge, onClear} = props;

    const history = useHistory();

    const _onClick = () => {
        WebSocketService.addChatUser(user.id);
        WebSocketService.addChatUserName(user.name);
        onClear(user.id);

        history.push('/chat', );
    };

    const getUserChip = () => {
        return (
            <Chip
                key={user.id}
                avatar={
                    <ChatAvatar online={user.isOnline} gender={user.gender}/>
                }
                label={
                    <Typography variant="body2">
                        <b>{user.name}</b></Typography>
                }
                onClick={() => _onClick()}
            />
        );
    };

    const renderChipWithBadge = () => {
        return (
            <Badge
                color='secondary'
                badgeContent="+1"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {getUserChip()}
            </Badge>
        );
    };

    return (
        <>
            {showBadge ? renderChipWithBadge() : getUserChip()}
        </>
    );
}
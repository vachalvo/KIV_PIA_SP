import 'bootstrap/dist/css/bootstrap.css';
import {
    List, ListItem, ListItemText
} from "@mui/material";

import {useEffect, useRef} from "react";
import AuthService from "../services/auth-service";

function ChatMessageList(props) {
    const {messages} = props;
    const listRef = useRef();

    const scrollToBottom = () => {
        listRef.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    }

    useEffect(scrollToBottom, [messages]);

    const formatMessage = (msg) => {
        const key = msg.text + '-' + msg.time;
        const date = new Date(msg.time);
        if(msg.from === AuthService.getCurrentUserId()){
            return (
                <ListItem key={key} style={{display:'flex', justifyContent:'flex-end', 'textAlign': 'right'}} >
                    <ListItemText primary={msg.text} secondary={date.toLocaleString()} />
                </ListItem>
            );
        }

        return (
            <ListItem key={key}>
                <ListItemText primary={msg.text} secondary={date.toLocaleString()} />
            </ListItem>
        );
    };

    const renderMessages = () => {
        return messages.map((msg) => formatMessage(msg));
    };

    return (
        <div>
            <List
                sx={{ width: '100%', height: 360,position: 'relative',overflow: 'auto', 'overflowWrap': 'break-word', textOverflow: 'auto', bgcolor: 'background.paper' }}
            >
                {renderMessages()}
                <ListItem key='empty-for-scroll'>
                    <ListItemText ref={listRef} primary={''} secondary={''} />
                </ListItem>
            </List>
        </div>
    );
}

export default ChatMessageList;

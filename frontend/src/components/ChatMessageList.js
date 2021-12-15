import 'bootstrap/dist/css/bootstrap.css';
import {
    List, ListItem, ListItemText
} from "@mui/material";

import AuthService from "../services/auth-service";

function ChatMessageList(props) {
    const {messages} = props;


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
                sx={{ width: '100%',
                    height: 250,
                    mb: 20,
                    position: 'relative',
                    overflow: 'auto',
                    'overflowWrap': 'break-word',
                    textOverflow: 'auto',
                    bgcolor: 'background.paper'
                }}
            >
                {renderMessages()}
            </List>
        </div>
    );
}

export default ChatMessageList;

import 'bootstrap/dist/css/bootstrap.css';
import {
    Avatar,
    Card, CardContent,
    CardHeader, TextField, InputAdornment, IconButton, Divider
} from "@mui/material";
import {Col, Row} from "react-bootstrap";
import {blue} from "@mui/material/colors";
import {SendOutlined} from "@mui/icons-material";
import {useEffect} from "react";
import ChatMessageList from "./ChatMessageList";
import WebSocketService from "../services/web-socket-service";

function ChatRoom(props) {
    const {
        onSendMessage,
        messages,
        setText,
        text
    } = props;

    const id = WebSocketService.getChatUserId(); // Read values passed on state
    const name = WebSocketService.getChatUserName();

    const send = () => {
        onSendMessage(text, id);
        setText('');
    };

    useEffect(() => {
        document.getElementById('standard-basic').focus();

    }, []);

    return (
        <div>
            <Row className={"justify-content-center"} >
                <Col md={8}>
                    <Card sx={{my: 5}} key={id}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: blue[500]  }} aria-label="avatar-post-card">
                                    T
                                </Avatar>
                            }
                            title={<b>{name}</b>}
                        />
                        <CardContent>
                            <Divider />
                            <ChatMessageList messages={messages} />
                            <Divider sx={{my: 2}}/>
                            <TextField
                                id="standard-basic"
                                label="Message"
                                placeholder="Type message"
                                variant="outlined"
                                fullWidth
                                color='primary'
                                value={text}
                                onKeyDown={(event) => {
                                    if(event.key === 'Enter'){
                                        send();
                                    }
                                }}
                                onChange={(event) => setText(event.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={send}
                                                edge="end"
                                                color='primary'
                                            >
                                                <SendOutlined />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </CardContent>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default ChatRoom;

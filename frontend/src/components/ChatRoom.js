import 'bootstrap/dist/css/bootstrap.css';
import {
    Avatar,
    Card, CardContent,List,
    CardHeader, ListItem, ListItemAvatar, ListItemText, TextField
} from "@mui/material";
import {Col, Row} from "react-bootstrap";
import {blue, pink} from "@mui/material/colors";
import {Image} from "@mui/icons-material";

function ChatRoom(props) {

    const renderMessages = () => {
        return (
            <List sx={{ width: '100%', height: 360, overflow: 'auto', bgcolor: 'background.paper' }}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Image />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Image />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Work" secondary="Jan 7, 2014" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Image />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Vacation" secondary="July 20, 2014" />
                </ListItem>                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Image />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Vacation" secondary="July 20, 2014" />
                </ListItem>                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Image />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Vacation" secondary="July 20, 2014" />
                </ListItem>                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Image />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Vacation" secondary="July 20, 2014" />
                </ListItem>                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Image />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Vacation" secondary="July 20, 2014" />
                </ListItem>                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Image />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Vacation" secondary="July 20, 2014" />
                </ListItem>                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Image />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Vacation" secondary="July 20, 2014" />
                </ListItem>                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Image />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Vacation" secondary="July 20, 2014" />
                </ListItem>
            </List>
        );
    };
    return (
        <div>
            <Row className={"justify-content-center"} >
                <Col md={8}>
                    <Card sx={{my: 5}}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: blue[500]  }} aria-label="avatar-post-card">
                                    T
                                </Avatar>
                            }
                            title={<b>Name</b>}
                        />
                        <CardContent>
                            {renderMessages()}
                            <TextField
                                id="standard-basic"
                                label="Message"
                                placeholder="Type message"
                                variant="outlined"
                                fullWidth
                            />
                        </CardContent>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default ChatRoom;

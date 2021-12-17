import 'bootstrap/dist/css/bootstrap.css';
import {Component} from "react";

import {Switch, Route} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import ChatMessageService from "./services/chat-message-service";
import AuthService from "./services/auth-service";
import WebSocketService from "./services/web-socket-service";
import Header from "./components/common/Header";
import Login from "./components/forms/auth/Login";
import SignUp from "./components/forms/auth/SignUp";
import Feed from "./components/Feed";
import FriendsManagement from "./components/friends/FriendsManagement";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";
import PrivateError from "./components/errors/PrivateError";
import ChatRoom from "./components/ChatRoom";
import DrawerFriends from "./components/common/DrawerFriends";
import FloatingButton from "./components/common/buttons/FloatingButton";
import authHeader from "./services/auth-header";
import {Alert, Snackbar} from "@mui/material";

class Home extends Component {
    constructor(props) {
        super(props);
        const { mode, onChangeMode } = props;

        this.state = {
            openDrawer: false,
            friends: [],
            messages: [],
            text: '',
            currentUser: AuthService.getToken(),
            notificationText: '',
            notificationOpen: false,
            waitingMessages: [],
        };

        this.stompClient = null;
        this.mode = mode;
        this.onChangeMode = onChangeMode;
    }

    componentDidMount() {
        if(this.stompClient === null){
            this.connect();
        }
        if(WebSocketService.getChatUserId() !== null){
            this.getMessages(WebSocketService.getChatUserId());
        }
    };

    toggleDrawer (event, open) {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        this.setState({
            ...this.state,
            openDrawer: open
        });
    }

    onLogin() {
        this.setState({
            ...this.state,
            currentUser: AuthService.getToken()
        });

        this.connect();
    }

    onLogout() {
        AuthService.logout();
        this.setState({
            ...this.state,
            currentUser: undefined
        });
        this.disconnect();
    };

    connect() {
        if(!AuthService.getCurrentUserId()){
            return;
        }

        const params = {
            headers: authHeader(),
            username: AuthService.getCurrentUserId()
        };

        WebSocketService.userConnect(AuthService.getCurrentUserId()).then(() => {
            const Stomp = require("stompjs");
            let SockJS = require("sockjs-client");
            SockJS = new SockJS("http://localhost:8080/chat", null, {
                ...params

            });

            this.stompClient = Stomp.over(SockJS);
            this.stompClient.connect({
                ...params
            }, this.onConnected.bind(this), this.onError.bind(this));
        })
        // TODO - catch
    };

    onConnected() {
        this.stompClient.subscribe('/user/queue/users', this.usersCallback.bind(this), authHeader());
        this.stompClient.subscribe('/topic/active', this.activeCallback.bind(this), authHeader());
        this.stompClient.subscribe('/user/queue/messages', this.messagesCallback.bind(this), authHeader());

        this.sendConnection(' connected to server');
    };

    usersCallback(output) {
        // To receive active users from server
        console.log('queue/users', JSON.parse(output.body));

        const activeFriends = JSON.parse(output.body);
        this.setState({
            ...this.state,
            friends: [
                ...activeFriends
            ]
        });
    };

    messagesCallback(output) {
        // To receive direct messages
        console.log('queue', JSON.parse(output.body));
        const body = JSON.parse(output.body);

        if(body.from !== AuthService.getCurrentUserId() && body.from !== WebSocketService.getChatUserId()){
            let f = this.state.friends.filter(obj => {
                return obj.id === body.from;
            });
            let friend = f.pop();
            let notificationText = 'New message from user was received. Check friends section.';
            if(friend != null){
                notificationText = 'New message from ' + friend.name + ' was received. Check friends section.'
            }
            const newWaitingMessages = [
                ...this.state.waitingMessages
            ];

            if(!newWaitingMessages.includes(body.from)){
                newWaitingMessages.push(body.from);
            }

            this.setState({
                ...this.state,
                notificationText: notificationText,
                notificationOpen: true,
                waitingMessages: [
                    ...newWaitingMessages
                ]
            });
            return;
        }
        const receivedMessages = [
            JSON.parse(output.body)
        ];

        const newMessages = [
            ...receivedMessages,
            ...this.state.messages
        ]

        this.setState({
            ...this.state,
            messages: [
                ...newMessages
            ]
        });
    };

    activeCallback(output) {
        // To receive all active users from server if somebody is connected
        const connectedUserId = JSON.parse(output.body);
        const friends = [
            ...this.state.friends
        ];

        friends.forEach((user) => {
            if(user.id === connectedUserId.id){
                user.isOnline = connectedUserId.isOnline;
            }
        });

        this.setState({
            ...this.state,
            friends: [
                ...friends
            ],
        });
    };

    sendConnection(message) {
        let text = AuthService.getCurrentUserId() + message;
        this.sendBroadcast({'from': 'server', 'text': text});
    };

    sendBroadcast(json) {
        this.stompClient.send("/app/broadcast", { headers: authHeader() }, JSON.stringify(json));
    };

    disconnect() {
        if(this.stompClient !== null){
            this.stompClient.disconnect(this.disconnectedCallback.bind(this), authHeader());
        }
    };

    disconnectedCallback() {
        this.stompClient = null;
    };

    sendMessage(msg, recipient) {
        if (msg.trim() !== "") {
            this.stompClient.send("/app/chat", { headers: authHeader(), 'sender': AuthService.getCurrentUserId()},
                JSON.stringify({'from': AuthService.getCurrentUserId(), 'text': msg, 'recipient': recipient}));
        }
    };

    onError(err) {
        console.log(err);
    };

    getMessages(id) {
        ChatMessageService.getMessages(AuthService.getCurrentUserId(), id).then((response) => {
            const msg = response.data;
            let waiting = [
                ...this.state.waitingMessages
            ];
            waiting = waiting.filter(e => e !== id);

            this.setState(state => ({
                ...state,
                messages: [
                    ...msg
                ],
                waitingMessages: [
                    ...waiting
                ]
            }));
        }).catch((err) => {
            if(err.response.status === 401){
                // todo
            }
        });
    };

    setText(text) {
        this.setState({
            ...this.state,
            text: text
        });
    };

    notificationOnClose() {
        this.setState({
            ...this.state,
            notificationOpen: false
        });
    };

    render() {
        return (
            <>
                <Snackbar open={this.state.notificationOpen} autoHideDuration={5000} onClose={this.notificationOnClose.bind(this)}>
                    <Alert variant="filled" onClose={this.notificationOnClose.bind(this)} severity={'info'} sx={{ width: '100%' }}>
                        {this.state.notificationText}
                    </Alert>
                </Snackbar>
                <Header
                    currentUser={this.state.currentUser}
                    onLogout={this.onLogout.bind(this)}
                    onChangeMode={this.onChangeMode}
                    mode={this.mode}
                />
                {AuthService.getCurrentUserId() &&
                    <>
                        <DrawerFriends
                            onClick={(event) => this.toggleDrawer(event, false)}
                            onKeyDown={(event) => this.toggleDrawer(event, false)}
                            setOpen={(open) => this.setState({
                                ...this.state,
                                openDrawer: open
                            })}
                            open={this.state.openDrawer}
                            friends={this.state.friends}
                            waitingMessages={this.state.waitingMessages}
                            onClear={this.getMessages.bind(this)}
                        />
                        <FloatingButton
                            showBadge={this.state.waitingMessages.length > 0}
                            badgeContent={this.state.waitingMessages.length}
                            onClick={(event) => this.toggleDrawer(event, true)}
                        />
                    </>
                }
                <Container>
                    <Row>
                        <Col lg={12} className={"margin-top"}>
                            <Switch>
                                <PrivateRoute path="/" exact component={Feed} />
                                <Route path="/signup" exact component={SignUp} />
                                <Route path={["/login", "/logout"]} exact component={() => <Login onLogin={this.onLogin.bind(this)} />} />
                                <PrivateRoute path="/profile" exact component={Profile} />
                                <PrivateRoute path="/friends" exact component={FriendsManagement} />
                                <PrivateRoute path="/chat" exact component={() =>
                                    <ChatRoom
                                        onSendMessage={this.sendMessage.bind(this)}
                                        messages={this.state.messages}
                                        text={this.state.text}
                                        setText={this.setText.bind(this)}
                                    />}
                                />
                                <Route path='*' exact={true} component={PrivateError} />
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default Home;
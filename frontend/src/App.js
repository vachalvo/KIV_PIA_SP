import 'bootstrap/dist/css/bootstrap.css';
import {useState} from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import FriendshipService from "./services/friendship-service";
import AuthService from "./services/auth-service";
import WebSocketService from "./services/web-socket-service";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Login from "./components/forms/auth/Login";
import SignUp from "./components/forms/auth/SignUp";
import Feed from "./components/Feed";
import FriendsManagement from "./components/friends/FriendsManagement";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";
import PrivateError from "./components/errors/PrivateError";
import ChatRoom from "./components/ChatRoom";
import DrawerFriends from "./components/common/DrawerFriends";
import FloatingButton from "./components/common/FloatingButton";
import authHeader from "./services/auth-header";

let stompClient = null;

const App = () => {
    const [values, setValues] = useState({
        openDrawer: false,
        friends: []
    });
    const [messages, setMessages] = useState([]);
    const [currentUser, setCurrentUser] = useState(AuthService.getToken);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setValues({
            ...values,
            openDrawer: open
        });
    };

    const updateFriends = () => {
        FriendshipService.findFriends().then((response) => {
            setValues({
                ...values,
                friends: response.data
            });
        }).catch((err) => {
            console.log('App.updateFriends', err);
        });
    };

    const onLogin = () => {
        setCurrentUser(AuthService.getToken());

        updateFriends();

        connect();
    };

    const onLogout = () => {
        AuthService.logout();
        setCurrentUser(undefined);

        disconnect();
    };

    const connect = () => {
        if(!AuthService.getCurrentUserId()){
            return;
        }

        const params = {
            headers: authHeader(),
            username: AuthService.getCurrentUserId()
        };

        WebSocketService.userConnect(AuthService.getCurrentUserId()).then(() => {
            const Stomp = require("stompjs");
            var SockJS = require("sockjs-client");
            SockJS = new SockJS("http://localhost:8080/chat", null, {
                ...params
            });

            stompClient = Stomp.over(SockJS);
            stompClient.connect({
                ...params
            }, onConnected, onError);
        })

    };

    const onConnected = () => {
        stompClient.subscribe('/topic/active', function (output) {
            console.log('active', JSON.parse(output.body));
        }, authHeader());

        stompClient.subscribe('/user/queue/messages', function (output) {
            console.log('queue', JSON.parse(output.body));
            const newMessages = [
                JSON.parse(output.body)
            ];

            setMessages(prevMessages => ([...prevMessages, ...newMessages]));
        }, authHeader());

        sendConnection(' connected to server');
    };

    const sendConnection = (message) => {
        var text = AuthService.getCurrentUserId() + message;
        sendBroadcast({'from': 'server', 'text': text});

        // for first time or last time, list active users:
        console.log('sendConnection to server', text);
    };

    const sendBroadcast = (json) => {
        console.log('sendBroadcast');
        stompClient.send("/app/broadcast", {}, JSON.stringify(json));
    };

    const disconnect = () => {
        console.log('Disconnected!');

        if(stompClient !== null){
            WebSocketService.userDisconnect(AuthService.getCurrentUserId()).then(() => {
                sendConnection(' disconnected from server');

                stompClient.disconnect(function() {
                    console.log('disconnected...');
                });
            }).catch((err) => {
                console.log('disconnect', err);
            })
        }
    };

    const sendMessage = (msg, recipient) => {
        if (msg.trim() !== "") {
            stompClient.send("/app/chat", { headers: authHeader(), 'sender': AuthService.getCurrentUserId()},
                JSON.stringify({'from': AuthService.getCurrentUserId(), 'text': msg, 'recipient': recipient}));
        }
    };

    const onError = (err) => {
        console.log(err);
    };

    const renderDrawer = () => {
        if(!currentUser){
            return <></>;
        }

        return <>
            <DrawerFriends
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
                setOpen={(open) => setValues({
                    ...values,
                    openDrawer: open
                })}
                open={values.openDrawer}
                friends={values.friends}
            />
            <FloatingButton

                onClick={toggleDrawer(true)}
            />
        </>;
    };

    return (
        <Router>
            <Header currentUser={currentUser} onLogout={onLogout}/>
            {renderDrawer()}
            <Container>
                <Row>
                    <Col lg={12} className={"margin-top"}>
                        <Switch>
                            <PrivateRoute path="/" exact component={Feed} />
                            <Route path="/signup" exact component={SignUp} />
                            <Route path={["/login", "/logout"]} exact component={() => <Login onLogin={onLogin} />} />
                            // TODO - add private routes !!!
                            <PrivateRoute path="/profile" exact component={Profile} />
                            <PrivateRoute path="/friends" exact component={FriendsManagement} />
                            <PrivateRoute path="/chat" exact component={() => <ChatRoom
                                onSendMessage={sendMessage}
                                messages={messages}
                            />}
                            />
                            <Route path='*' exact={true} component={PrivateError} />
                        </Switch>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </Router>
    );
}

export default App;

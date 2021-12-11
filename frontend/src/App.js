import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from "react";

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import AuthService from "./services/auth-service";
import UserService from "./services/user-service";
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

const App = () => {
    const [currentUser, setCurrentUser] = useState(AuthService.getToken());
    const [openDrawer, setOpenDrawer] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpenDrawer(open);
    };

    const onLogin = () => {
        setCurrentUser(AuthService.getToken());
    };

    const onLogout = () => {
        AuthService.logout();
        setCurrentUser(undefined);
    };

    const renderChatManagement = () => {
        return (
            <>
                <DrawerFriends onClick={toggleDrawer(false)}
                               onKeyDown={toggleDrawer(false)}
                               setOpen={setOpenDrawer}
                               open={openDrawer}
                />
                <FloatingButton
                    onClick={toggleDrawer(true)}
                />
            </>
        );
    }

    return (
        <Router>
            <Header currentUser={currentUser} onLogout={onLogout}/>
            {currentUser ? renderChatManagement() : <></>}
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
                            <PrivateRoute path="/chat" exact component={ChatRoom} />
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

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
import FriendsManagement from "./components/FriendsManagement";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";
import PrivateError from "./components/errors/PrivateError";



const App = () => {
    const [currentUser, setCurrentUser] = useState(AuthService.getToken());

    const onLogin = () => {
        setCurrentUser(AuthService.getToken());
    };

    const onLogout = () => {
        AuthService.logout();
        setCurrentUser(undefined);
    };

    return (
        <Router>
            <Header currentUser={currentUser} onLogout={onLogout}/>
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

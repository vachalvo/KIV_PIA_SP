import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import AuthService from "./services/auth-service";

import Home from "./components/base/Home";
import Header from "./components/base/Header";
import Footer from "./components/base/Footer";
import Login from "./components/forms/auth/Login";
import SignUp from "./components/forms/auth/SignUp";
import Feed from "./components/Feed";
import FriendsManagement from "./components/FriendsManagement";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";
import PrivateError from "./components/errors/PrivateError";


const App = () => {
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getToken();

        if (user) {
            setCurrentUser(user);
        }
    }, []);


    return (
        <Router>
            <Header currentUser={currentUser}/>
            <Container>
                <Row>
                    <Col lg={12} className={"margin-top"}>
                        <Switch>
                            <PrivateRoute path="/" exact component={Feed} />
                            <Route path="/signup" exact component={SignUp} />
                            <Route path="/login" exact component={Login} />
                            <Route path="/logout" exact component={Login} />
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

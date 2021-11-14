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
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";


const App = () => {
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

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
                            <Route path="/" exact component={Home} />
                            <Route path="/signup" exact component={SignUp} />
                            <Route path="/login" exact component={Login} />
                            <Route path="/logout" exact component={Login} />

                            <PrivateRoute path="/feed" exact component={Feed} />
                            <PrivateRoute path="/profile" exact component={Profile} />
                            <PrivateRoute path="/friends" exact component={Home} />
                        </Switch>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </Router>
    );
}

export default App;

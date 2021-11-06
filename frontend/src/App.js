import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/forms/Login";
import SignUp from "./components/forms/SignUp";
import Feed from "./components/Feed";

const App = () => {
    return (
        <Router>
            <Header />
            <Container>
                <Row>
                    <Col lg={12} className={"margin-top"}>
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/feed" exact component={Feed} />
                            <Route path="/signup" exact component={SignUp} />
                            <Route path="/login" exact component={Login} />
                            <Route path="/logout" exact component={Login} />
                        </Switch>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </Router>
    );
}

export default App;

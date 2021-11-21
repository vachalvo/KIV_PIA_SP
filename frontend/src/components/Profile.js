import React, {useEffect, useState} from "react";
import AuthService from "../services/auth-service";
import UserService from "../services/user-service";
import {Card, Row, Col, Container, ListGroup, Placeholder} from "react-bootstrap";
import ManProfile from "../img/man.png";
import WomanProfile from "../img/woman.png";
import CardHeader from "react-bootstrap/CardHeader";

const imgStyle = {
    margin: "20px 0 20px 20px",
};

const Profile = () => {
    const [user, setUser] = useState(undefined);

    useEffect(() => {
         const fetchUser = async () => {
            const res = await UserService.getUser(AuthService.getCurrentUserId());
            return res.data;
        }

        fetchUser().then((res) => {
            setUser(res);
        });
    }, []);

    const renderLoggedUserProfile = () => {
        return (
            <Container  style={{margin: "0px", padding: "20px"}}>
                <Row className={"justify-content-center"}>
                    <Col md={10}>
                        <Card>
                            <Row>
                                <Col md={4}>
                                    <div style={imgStyle}>
                                        <Card.Img src={user.gender === "male" ? ManProfile : WomanProfile}  className={"mx-auto"}/>
                                    </div>

                                </Col>
                                <Col md={8}>
                                    <CardHeader>
                                        <h1>{ user.firstName + " " + user.lastName }</h1>
                                    </CardHeader>
                                    <Card.Body>
                                        <Card.Title style={{margin: "0 0 10px 0"}}>
                                            Basic Info
                                        </Card.Title>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item><b>Email:</b> {user.email}</ListGroup.Item>
                                            <ListGroup.Item><b>Gender:</b> {user.gender === "male" ? "Male" : "Female"}</ListGroup.Item>
                                        </ListGroup>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }

    const renderPrivateError = () => {
        return (
            <Container  style={{margin: "0px", padding: "20px"}}>
                <Row className={"justify-content-center"}>
                    <Col md={10}>
                        <Card>
                            <Row>
                                <Col md={4}>
                                    <div style={imgStyle}>
                                        <Card.Img src={WomanProfile}  className={"mx-auto"}/>
                                    </div>
                                </Col>
                                <Col md={8}>
                                    <Placeholder as={Card.Header} animation="glow" size="lg">
                                        <Placeholder as={Card.Text} animation="glow"  size="lg">
                                            <Placeholder xs={7}  size="lg"/>
                                        </Placeholder>
                                    </Placeholder>
                                    <Placeholder as={Card.Body} animation="glow">
                                        <Placeholder as={Card.Title} animation="glow" style={{margin: "0 0 10px 0"}}>
                                            <Placeholder as={Card.Text} animation="glow">
                                                <Placeholder xs={5} size="lg" />
                                            </Placeholder>
                                            <Placeholder as={Card.Text} animation="glow">
                                                <Placeholder xs={4} />
                                            </Placeholder>
                                            <Placeholder as={Card.Text} animation="glow">
                                                <Placeholder xs={4} />
                                            </Placeholder>
                                        </Placeholder>
                                    </Placeholder>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <>
            {user ? renderLoggedUserProfile() : renderPrivateError()}
        </>
    );
};

export default Profile;
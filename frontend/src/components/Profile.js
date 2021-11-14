import React from "react";
import AuthService from "../services/auth-service";
import {Button, Card, Form, InputGroup, Row, Col, Container, Image, ListGroup} from "react-bootstrap";
import ManProfile from "../img/man.png";
import WomanProfile from "../img/woman.png";
import CardHeader from "react-bootstrap/CardHeader";

const imgStyle = {
    margin: "20px 0 20px 20px",
};

const Profile = (props) => {
    const {name, email, gender} = props;
    const currentUser = AuthService.getCurrentUser();
    if(!currentUser){
        return <></>;
    }

    return (
        <Container  style={{margin: "0px", padding: "20px"}}>
            <Row className={"justify-content-center"}>
                <Col md={10}>
                    <Card>
                        <Row>
                            <Col md={4}>
                                <div style={imgStyle}>
                                    <Card.Img src={WomanProfile }  className={"mx-auto"}/>
                                </div>

                            </Col>
                            <Col md={8}>
                                <CardHeader>
                                    <h1> Nellinka Azurová</h1>
                                </CardHeader>
                                <Card.Body>
                                    <Card.Title style={{margin: "0 0 10px 0"}}>
                                        Basic Info
                                    </Card.Title>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item><b>Email:</b> email@email.cz</ListGroup.Item>
                                        <ListGroup.Item><b>Gender:</b> Male</ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
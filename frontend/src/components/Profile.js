import React, {useEffect, useState} from "react";
import AuthService from "../services/auth-service";
import UserService from "../services/user-service";
import {Card, Row, Col, Container, ListGroup} from "react-bootstrap";
import ManProfile from "../img/man.png";
import WomanProfile from "../img/woman.png";
import "../styles/components/profile.css";
import {Skeleton, Typography} from "@mui/material";

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
            <div class="profile-area">
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md={8} lg={6}>
                            <Card>
                                <div class="img1">
                                    <img src={user.gender === "male" ? ManProfile : WomanProfile} alt="" />
                                </div>
                                <Card.Header>
                                    <h1>{ user.firstName + " " + user.lastName }</h1>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title style={{margin: "0 0 10px 0"}}>
                                        Basic Info
                                    </Card.Title>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item><b>Email:</b> {user.email}</ListGroup.Item>
                                        <ListGroup.Item><b>Gender:</b> {user.gender === "male" ? "Male" : "Female"}</ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    const renderPrivateError = () => {
        return (
            <div className="profile-area">
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md={8} lg={6}>
                            <Card>
                                <Skeleton variant="rectangular" height={140} />
                                <Card.Header>
                                    <Typography variant="h3">{<Skeleton />}</Typography>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title style={{margin: "0 0 10px 0"}}>
                                        <Typography variant="h6">{<Skeleton />}</Typography>
                                    </Card.Title>
                                    <ListGroup variant="flush">
                                        <Skeleton width="60%"/>
                                        <Skeleton width="60%"/>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    return (
        <>
            {user ? renderLoggedUserProfile() : renderPrivateError()}
        </>
    );
};

export default Profile;
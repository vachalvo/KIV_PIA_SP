import React, {useEffect, useState} from "react";
import AuthService from "../services/auth-service";
import UserService from "../services/user-service";
import {Card, Row, Col, Container, ListGroup} from "react-bootstrap";
import ManProfile from "../img/man.png";
import WomanProfile from "../img/woman.png";
import "../styles/components/profile.css";
import {Skeleton, Typography} from "@mui/material";
import PostService from "../services/post-service";
import PostCard from "./PostCard";

const Profile = () => {
    const [user, setUser] = useState(undefined);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        UserService.getUser(AuthService.getCurrentUserId()).then((res) => {
            setUser(res.data);
        });
        fetchData();
    }, []);

    const fetchData = () => {
        PostService.findAllByUser(page).then((res) => {
            setPosts(res.data.posts);
        });
    }

    const renderLoggedUserProfile = () => {
        return (
            <div className="profile-area">
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md={8} lg={6}>
                            <Card>
                                <div className="img1">
                                    <img src={user.gender === "MALE" ? ManProfile : WomanProfile} alt="" />
                                </div>
                                <Card.Header>
                                    <h1>{ user.name }</h1>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title style={{margin: "0 0 10px 0"}}>
                                        Basic Info
                                    </Card.Title>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item><b>Email:</b> {user.email}</ListGroup.Item>
                                        <ListGroup.Item><b>Gender:</b> {user.gender === "MALE" ? "Male" : "Female"}</ListGroup.Item>
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
    };

    const renderPosts = posts.map((post) => {
        return <PostCard post={post} fetchData={fetchData}/>;
    });

    return (
        <>
            {user ? renderLoggedUserProfile() : renderPrivateError()}
            {posts && renderPosts}
        </>
    );
};

export default Profile;
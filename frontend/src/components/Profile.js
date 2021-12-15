import React, {useEffect, useState} from "react";
import AuthService from "../services/auth-service";
import UserService from "../services/user-service";
import {Row, Col, Container} from "react-bootstrap";
import ManProfile from "../img/man.png";
import WomanProfile from "../img/woman.png";
import {
    Card,
    CardContent,
    CardMedia,
    List, ListItem, ListItemIcon,
    ListItemText,
    Skeleton,
    Typography
} from "@mui/material";
import PostService from "../services/post-service";
import {
    AlternateEmailOutlined,
    FemaleOutlined,
    MaleOutlined,
} from "@mui/icons-material";
import PostList from "./posts/PostsList";

const Profile = () => {
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        UserService.getUser(AuthService.getCurrentUserId()).then((res) => {
            setUser(res.data);
        });

    }, []);

    const renderLoggedUserProfile = () => {
        return (
            <div style={{margin: '20px 0 20px 0'}}>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md={8} lg={6}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    alt=""
                                    sx={{ marginTop: '10px',
                                        maxWidth: 150,
                                        marginRight: 'auto',
                                        marginLeft: 'auto'
                                    }}
                                    image={user.gender === "MALE" ? ManProfile : WomanProfile}
                                />
                                <CardContent >
                                    <Typography variant="h4" component="div">
                                        {user.name}
                                    </Typography>
                                    <List sx={{marginLeft: '10px', color: 'gray'}}>
                                        <ListItem>
                                            <ListItemIcon size="small">
                                                <AlternateEmailOutlined />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    user.email
                                                }
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon size="small">
                                                {user.gender === "MALE" ? <MaleOutlined /> : <FemaleOutlined />}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    user.gender === "MALE" ? "Male" : "Female"
                                                }
                                            />
                                        </ListItem>
                                    </List>
                                </CardContent>
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
                                <CardContent >
                                    <Typography variant="h4" component="div">
                                        <Skeleton />
                                    </Typography>
                                    <List sx={{marginLeft: '10px'}}>
                                        <Skeleton>
                                            <ListItem>
                                                <ListItemIcon size="small">
                                                </ListItemIcon>
                                                <ListItemText/>
                                            </ListItem>
                                        </Skeleton>
                                        <Skeleton>
                                            <ListItem>
                                                <ListItemIcon size="small">
                                                </ListItemIcon>
                                                <ListItemText/>
                                            </ListItem>
                                        </Skeleton>
                                    </List>
                                </CardContent>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    };

    return (
        <div className={"justify-content-center"}>
            { user ? renderLoggedUserProfile() : renderPrivateError()}
            <PostList findAll={PostService.findAllByUser} disableRefresh={true}/>
        </div>
    );
};

export default Profile;
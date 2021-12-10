import 'bootstrap/dist/css/bootstrap.css';
import FriendsList from "./FriendsList";
import {Container, Row, Stack} from "react-bootstrap";
import SearchBar from "./SearchBar";
import FriendshipService from "../services/friendship-service";
import {useRef, useState} from "react";
import {Alert, Card, CardContent, Snackbar, Typography} from "@mui/material";
import UserService from "../services/user-service";
import SnackBarAlert from "./errors/SnackBarAlert";

function FriendsManagement() {
    const [alertValues, setAlertValues] = useState({
        open: false,
        text: '',
        severity: 'success'
    });

    const friendsRef = useRef();
    const receivedRequestsRef = useRef();
    const sendRequestsRef = useRef();
    const blocksRef = useRef();

    const fetchItems = async (type, bySource) => {
        const res = await FriendshipService.findFriendsByType(type, bySource);
        return res.data;
    };

    const fetchFriends = async () => {
        return await fetchItems(FriendshipService.TYPES.friends);
    };
    const fetchBlocks = async () => {
        return await fetchItems(FriendshipService.TYPES.blocked, false);
    };
    const fetchSendRequests = async () => {
        return await fetchItems(FriendshipService.TYPES.request_waiting, true)
    };
    const fetchReceivedRequests = async () => {
        return await fetchItems(FriendshipService.TYPES.request_waiting, false);
    };

    const sendRequest = async (id) => {
        FriendshipService.newFriendship(id).then(() => {
            setAlertValues({
                open: true,
                text: 'Request was successfully send.'
            });
        })
        await fetchSendRequests();
        sendRequestsRef.current.update();
    };

    const setAlert = (state) => {
        let msg = '';
        // eslint-disable-next-line default-case
        switch (state) {
            case FriendshipService.STATES.accept:
                msg = 'Request was successfully accepted.';
                break;
            case FriendshipService.STATES.blocked:
                msg = 'User was blocked.';
                break;
        }
        setAlertValues({
            open: true,
            text: msg
        });
    };

    const interact = async (id, state) => {
        await FriendshipService.interact(id, state);

        await fetchReceivedRequests();
        receivedRequestsRef.current.update();
        await fetchFriends();
        friendsRef.current.update();
        await fetchBlocks();
        blocksRef.current.update();

        setAlert(state);
    }

    const cancel = async (id, type) => {
        await FriendshipService.cancel(id);
        // eslint-disable-next-line default-case
        switch (type) {
            case 'Received requests':
                await fetchReceivedRequests();
                receivedRequestsRef.current.update();
                setAlertValues({
                    open: true,
                    text: 'Request was successfully canceled.'
                });
                break;
            case 'Send requests':
                await fetchSendRequests();
                sendRequestsRef.current.update();
                setAlertValues({
                    open: true,
                    text: 'Request was successfully canceled.'
                });
                break;
            case 'Friends':
                await fetchFriends();
                friendsRef.current.update();
                setAlertValues({
                    open: true,
                    text: 'Friend was successfully removed.'
                });
                break;
            case 'Blocked users':
                await fetchBlocks();
                setAlertValues({
                    open: true,
                    text: 'User was successfully unblocked.'
                });
                blocksRef.current.update();
                break;
        }
    };

    const promote = async (id) => {
        UserService.promote(id).then((response) => {
            friendsRef.current.update();
            setAlertValues({
                open: true,
                text: 'User was successfully promote.'
            });
        }).catch((err) => {
            console.log("Promote error", err);
        });
    };

    const demote = async (id) => {
        UserService.demote(id).then((response) => {
            friendsRef.current.update();
            setAlertValues({
                open: true,
                text: 'User was successfully demote.'
            });
        }).catch((err) => {
            console.log("Demote error", err);
        });
    };


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') { return; }

        setAlertValues({
            ...alertValues,
            open: false
        });
    };

    return (
        <>
            <SnackBarAlert
                open={alertValues.open}
                onClose={handleClose}
                severity={alertValues.severity}
                text={alertValues.text}
            />
            <Container style={{padding: '20px 0 0 0'}}>
                <Stack gap={4}>
                    <Card>
                        <CardContent>
                            <Typography sx={{ pb: 2 }} className="text-center" variant="h4" component="div">
                                Search friend
                            </Typography>
                            <SearchBar onSend={sendRequest} onDecision={interact} onDelete={cancel} />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <Typography sx={{ pb: 2 }} className="text-center" variant="h4" component="div">
                                Friendship management
                            </Typography>
                            <Row xs={1} md={2} className='g-4'>
                                <Stack gap={3}>
                                    <FriendsList
                                        ref={receivedRequestsRef}
                                        type='Received requests'
                                        onFetch={fetchReceivedRequests}
                                        onDelete={cancel}
                                        onDecision={interact}
                                    />
                                    <FriendsList
                                        ref={sendRequestsRef}
                                        type='Send requests'
                                        onFetch={fetchSendRequests}
                                        onDelete={cancel}
                                    />
                                </Stack>
                                <Stack gap={3}>
                                    <FriendsList
                                        ref={friendsRef}
                                        type='Friends'
                                        onFetch={fetchFriends}
                                        onPromote={promote}
                                        onDemote={demote}
                                        admin={UserService.isUserAdmin()}
                                        onDelete={cancel}
                                    />
                                    <FriendsList
                                        ref={blocksRef}
                                        type='Blocked users'
                                        onFetch={fetchBlocks}
                                        onDelete={cancel}
                                    />
                                </Stack>
                            </Row>
                        </CardContent>
                    </Card>
                </Stack>
            </Container>
        </>
    );
}

export default FriendsManagement;

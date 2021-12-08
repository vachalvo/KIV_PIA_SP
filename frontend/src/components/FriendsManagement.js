import 'bootstrap/dist/css/bootstrap.css';
import FriendsList from "./FriendsList";
import {Container, Row, Stack} from "react-bootstrap";
import SearchBar from "./SearchBar";
import FriendshipService from "../services/friendship-service";
import {useRef} from "react";
import {Card, CardContent, CardHeader, Typography} from "@mui/material";

function FriendsManagement() {
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
        await FriendshipService.newFriendship(id);
        await fetchSendRequests();
        sendRequestsRef.current.update();
    };

    const interact = async (id, state) => {
        await FriendshipService.interact(id, state);

        await fetchReceivedRequests();
        receivedRequestsRef.current.update();
        await fetchFriends();
        friendsRef.current.update();
        await fetchBlocks();
        blocksRef.current.update();
    }

    const cancel = async (id, type) => {
        await FriendshipService.cancel(id);
        // eslint-disable-next-line default-case
        switch (type) {
            case 'Received requests':
                await fetchReceivedRequests();
                receivedRequestsRef.current.update();
                break;
            case 'Send requests':
                await fetchSendRequests();
                sendRequestsRef.current.update();
                break;
            case 'Friends':
                await fetchFriends();
                friendsRef.current.update();
                break;
            case 'Blocked users':
                await fetchBlocks();
                blocksRef.current.update();
                break;
        }
    };

    const promote = async (id) => {
        // TODO - missing impl on BE
    };

    return (
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
    );
}

export default FriendsManagement;

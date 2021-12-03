import 'bootstrap/dist/css/bootstrap.css';
import FriendsList from "./FriendsList";
import {Container, Row} from "react-bootstrap";
import SearchBar from "./SearchBar";
const todo = [
    {
        id: "5b8d2753-623a-4b8c-a613-02b89cf34465",
        name: "vojtech vachal",
        email: "email@email.cz",
        gender: "male"
    },{
        id: "5b8d2753-623a-4b8a-a613-02b89cf34465",
        name: "Emily Blunt",
        email: "emily@blune.cz",
        gender: "female"
    },{
        id: "5b8d2753-623a-4b8c-a614-02b89cf34465",
        name: "John Smiths",
        email: "smits@email.cz",
        gender: "male"
    },{
        id: "5b872753-623a-4b8c-a613-02b89cf34465",
        name: "Scarlett Johannson",
        email: "black.widow@avengers.cz",
        gender: "female"
    },{
        id: "5b8d2753-623a-4b8c-a613-02b89cf34465",
        name: "vojtech vachal",
        email: "email@email.cz",
        gender: "male"
    },{
        id: "5b8d2753-623a-4b8a-a613-02b89cf34465",
        name: "Emily Blunt",
        email: "emily@blune.cz",
        gender: "female"
    },{
        id: "5b8d2753-623a-4b8c-a614-02b89cf34465",
        name: "John Smiths",
        email: "smits@email.cz",
        gender: "male"
    },{
        id: "5b872753-623a-4b8c-a613-02b89cf34465",
        name: "Scarlett Johannson",
        email: "black.widow@avengers.cz",
        gender: "female"
    },{
        id: "5b8d2753-623a-4b8c-a613-02b89cf34465",
        name: "vojtech vachal",
        email: "email@email.cz",
        gender: "male"
    },{
        id: "5b8d2753-623a-4b8a-a613-02b89cf34465",
        name: "Emily Blunt",
        email: "emily@blune.cz",
        gender: "female"
    },{
        id: "5b8d2753-623a-4b8c-a614-02b89cf34465",
        name: "John Smiths",
        email: "smits@email.cz",
        gender: "male"
    },{
        id: "5b872753-623a-4b8c-a613-02b89cf34465",
        name: "Scarlett Johannson",
        email: "black.widow@avengers.cz",
        gender: "female"
    }
];

function FriendsManagement(props) {
    return (
        <Container style={{padding: '20px 0 0 0'}}>
            <SearchBar />
            <Row xs={1} md={2} className='g-4'>
                <FriendsList type='Received requests' items={todo}/>
                <FriendsList type='Send requests' items={todo}/>
                <FriendsList type='Friends' items={todo}/>
                <FriendsList type='Blocked users' items={todo}/>
            </Row>
        </Container>
    );
}

export default FriendsManagement;

import 'bootstrap/dist/css/bootstrap.css';
import {Card, Col, Container, Row} from "react-bootstrap";
import {Divider, List} from "@mui/material";
import FriendItem from "./FriendItem";


function FriendsList(props) {
    const {type, items} = props;

    return (
        <Col>
            <Card>
                <Card.Header className="text-center" as="h3">{type}</Card.Header>
                <Card.Body>
                    <List
                        style={{maxHeight: 400, overflow: 'auto'}}
                    >
                        {items.map((item) => {
                            return <FriendItem key={item.id} item={item} type={type} />
                        })}
                    </List>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default FriendsList;

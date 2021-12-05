import 'bootstrap/dist/css/bootstrap.css';
import {Card, Col} from "react-bootstrap";
import {List} from "@mui/material";
import FriendItem from "./FriendItem";
import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import UserService from "../services/user-service";
import AuthService from "../services/auth-service";

const FriendsList = forwardRef((props, ref) => {
    const {type, onFetch, onDelete, onDecision} = props;
    const [items, setItems] = useState([]);

    useImperativeHandle(
        ref,
        () => ({
            update() {
                updateItems();
            }
        }),
    );

    const updateItems = () => {
        onFetch().then((res) => {
            setItems(res);
        });
    }

    useEffect(() => {
        updateItems();
    }, []);

    return (
        <Col>
            <Card>
                <Card.Header className="text-center" as="h3">{type}</Card.Header>
                <Card.Body>
                    <List
                        style={{maxHeight: 400, overflow: 'auto'}}
                    >
                        {items.map((item) => {
                            return <FriendItem
                                key={item.id}
                                item={item}
                                type={type}
                                onDelete={onDelete}
                                onDecision={onDecision}
                            />
                        })}
                    </List>
                </Card.Body>
            </Card>
        </Col>
    );
});

export default FriendsList;

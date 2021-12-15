import 'bootstrap/dist/css/bootstrap.css';
import {Card, Col} from "react-bootstrap";
import {List, Typography} from "@mui/material";
import FriendItem from "./FriendItem";
import {forwardRef, useEffect, useImperativeHandle, useState} from "react";

const FriendsList = forwardRef((props, ref) => {
    const {type, onFetch, onDelete, onDecision, onPromote, onDemote, admin} = props;
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
                <Card.Header className="text-center" >
                    <Typography variant="h5" component="div">
                        {type}
                    </Typography>
                </Card.Header>
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
                                onPromote={onPromote}
                                onDemote={onDemote}
                                admin={admin}
                            />
                        })}
                    </List>
                </Card.Body>
            </Card>
        </Col>
    );
});

export default FriendsList;

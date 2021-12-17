import 'bootstrap/dist/css/bootstrap.css';
import {Col} from "react-bootstrap";
import {Card, CardContent, List, Typography} from "@mui/material";
import FriendItem from "./FriendItem";
import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {useHistory} from "react-router-dom";

const FriendsList = forwardRef((props, ref) => {
    const {type, onFetch, onDelete, onDecision, onPromote, onDemote, admin} = props;
    const [items, setItems] = useState([]);
    const history = useHistory();

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
        }).catch((err) => {
            if(err.response.status === 401){
                history.push({
                    pathname: "/login",
                    state: {
                        detail: 401
                    }
                });
            }
        });
    }

    useEffect(() => {
        updateItems();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Col>
            <Card>
                <CardContent>
                    <div className={'text-center'}>
                        <Typography variant="h5" component="div">
                            {type}
                        </Typography>
                    </div>
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
                </CardContent>
            </Card>
        </Col>
    );
});

export default FriendsList;

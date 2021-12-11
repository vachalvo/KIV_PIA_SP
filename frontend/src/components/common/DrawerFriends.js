import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import UserChip from "../avatars/UserChip";
import {useHistory} from "react-router-dom";

export default function DrawerFriends(props) {
    const { onClick, onKeyDown, open, setOpen } = props;
    const history = useHistory();

    const list = () => (
        <Box
            role="presentation"
            onClick={onClick}
            onKeyDown={onKeyDown}
        >
            <List>
                <ListItem key={'TODO'}>
                    <UserChip user={{
                            gender: 'MALE',
                            name: 'TODO',
                        }}
                        onClick={() => history.push('/chat')}
                    />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
            <Drawer
                anchor={'right'}
                open={open}
                onClose={() => setOpen(false)}
            >
                {list()}
            </Drawer>
        </div>
    );
}

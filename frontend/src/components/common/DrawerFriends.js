import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import UserChip from "../avatars/UserChip";

export default function DrawerFriends(props) {
    const { onClick, onKeyDown, open, setOpen, friends, onClear, waitingMessages } = props;

    const getUserChip = (user) => {
        return (
            <ListItem key={user.id} >
                <UserChip
                    onClear={onClear}
                    user={user}
                    showBadge={waitingMessages.includes(user.id)}
                />
            </ListItem>
        );
    };

    return (
        <div>
            <Drawer
                anchor={'right'}
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box
                    role="presentation"
                    onKeyDown={onKeyDown}
                    onClick={onClick}
                >
                    <List sx={{m: 1}} disablePadding={true} >
                        {friends.map((user) => (
                            getUserChip(user)
                        ))}
                    </List>
                </Box>
            </Drawer>
        </div>
    );
}

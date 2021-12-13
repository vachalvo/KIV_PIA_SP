import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import UserChip from "../avatars/UserChip";
import AuthService from "../../services/auth-service";

export default function DrawerFriends(props) {
    const { onClick, onKeyDown, open, setOpen, friends } = props;
    const currentUserId = AuthService.getCurrentUserId();

    const getUserChip = (friendship) => {
        const user = friendship.sourceUser.id === currentUserId ? friendship.endUser : friendship.sourceUser;

        return (
            <ListItem key={friendship.id}>
                <UserChip
                    user={user}
                />
            </ListItem>
        );
    }
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
                        {friends.map((friendship) => (
                            getUserChip(friendship)
                        ))}
                    </List>
                </Box>
            </Drawer>
        </div>
    );
}

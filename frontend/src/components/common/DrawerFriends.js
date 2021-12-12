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
                    {friends.map((friendship) => (
                        <List sx={{m: 1}} disablePadding={true}>
                            <ListItem key={friendship.id}>
                                <UserChip
                                    user={friendship.sourceUser.id === currentUserId ? friendship.endUser : friendship.sourceUser}
                                />
                            </ListItem>
                        </List>
                    ))}
                </Box>
            </Drawer>
        </div>
    );
}

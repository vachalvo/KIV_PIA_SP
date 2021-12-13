import * as React from 'react';
import Chip from '@mui/material/Chip';
import GenderAvatar from "./GenderAvatar";
import {useHistory} from "react-router-dom";
import {Badge} from "@mui/material";

export default function UserChip(props) {
    const {user, showBadge, isOnline} = props;

    const history = useHistory();

    const _onClick = () => {
        history.push('/chat', {
            id: user.id,
            name: user.name
        });
    };

    const getUserChip = () => {
        return (
            <Chip
                key={user.id}
                color={isOnline ? 'success' : 'error'}
                avatar={<GenderAvatar gender={user.gender} />}
                label={user.name}
                onClick={() => _onClick()}
            />
        );
    };

    const renderChipWithBadge = () => {
        return (
            <Badge
                color='secondary'
                badgeContent=" "
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {getUserChip()}
            </Badge>
        );
    };

    return (
        <>
            {showBadge ? renderChipWithBadge() : getUserChip()}
        </>
    );
}
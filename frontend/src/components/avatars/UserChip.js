import * as React from 'react';
import Chip from '@mui/material/Chip';
import GenderAvatar from "./GenderAvatar";

export default function UserChip(props) {
    const {user, onClick} = props;

    // TODO - change color if user is logged or not - default or success (primary)
    return (
        <Chip
            avatar={<GenderAvatar gender={user.gender} />}
            label={user.name}
            onClick={onClick}
        />
    );
}
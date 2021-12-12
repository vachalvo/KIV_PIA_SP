import * as React from 'react';
import Chip from '@mui/material/Chip';
import GenderAvatar from "./GenderAvatar";
import {useHistory} from "react-router-dom";

export default function UserChip(props) {
    const {user} = props;
    const history = useHistory();
    // TODO - change color if user is logged or not - default or success (primary)

    const _onClick = () => {
        history.push('/chat', {
            id: user.id,
            name: user.name
        });
    };

    return (
        <Chip
            key={user.id}
            avatar={<GenderAvatar gender={user.gender} />}
            label={user.name}
            onClick={() => _onClick()}
        />
    );
}
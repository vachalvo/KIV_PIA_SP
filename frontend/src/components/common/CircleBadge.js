import * as React from 'react';
import Badge from '@mui/material/Badge';

export default function CircleBadge(props) {
    const {Component, badgeContent} = props;

    return (
        <Badge
            color="secondary"
            badgeContent={badgeContent ? badgeContent : ' '}
            overlap="circular"
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <Component {...props}/>
        </Badge>
    );
}
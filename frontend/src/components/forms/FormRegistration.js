import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Container, Paper, Button} from "@mui/material";
import {useEffect, useState} from "react";

export default function BasicTextFields() {
    const paperStyle = {
        padding: "50px 50px",
        width: 600,
        margin: "20px auto"
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [users, setUsers] = useState([]);

    const _onClick = (e) => {
        e.preventDefault();
        const user = {
            username,
            password,
            email
        }

        fetch("http://localhost:8080/user/add", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user),
        }).then(() => {
            console.log("New User Added to DB.")
        });
    }

    useEffect(() => {
        fetch("http://localhost:8080/user/getAll", {
            method: "GET",
        }).then(res => res.json()).then(result => {
            setUsers(result);
            console.log(users);
        });
    }, [])
    return (
        <Container>
            <Paper elevation={3}>
                <h1 style={{padding: "20px 0px 0px 0px"}}>
                    Registrace
                </h1>
                <Box
                    style={paperStyle}
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="username" label="Enter username" variant="outlined" fullWidth
                        value={username} onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField id="password" label="Enter password" variant="outlined" fullWidth
                               value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField id="email" label="Enter email" variant="outlined" fullWidth
                               value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button variant="contained" onClick={_onClick}>Registrovat</Button>
                </Box>
            </Paper>
            <Paper elevation={3}>
                {users.map(user => (
                    <Paper elevation={6} key={user.id} style={{
                        margin: "10px", padding: "15px", textAlign: "left"
                    }
                    }>
                        Id: {user.id}<br/>
                        Name: {user.username}<br/>
                        Password: {user.password}<br/>
                        Email: {user.email}
                    </Paper>
                ))}
            </Paper>

        </Container>
    );
}

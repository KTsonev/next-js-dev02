'use client';

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from 'react';
import {useState} from "react";
import Alert from "@mui/material/Alert";

export default function RegisterForm() {
    const [values, setValue] = useState({username:'', password: '', confirm_password: ''});
    const [messages, setMessage] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (values.confirm_password === values.password) {
            fetch('/api/user/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            }).then(result  => {
                result.json().then((e) => {
                    setMessage([]);
                    if (e.ok) {
                        setMessage([{text: e.message, type: 'success'}]);
                    } else {
                        setMessage([{text: e.message, type: 'error'}]);
                    }
                });
            });
        } else {
            setMessage([{text: 'Password not the same as confirm password', type: 'error'}]);
        }
    }

    const updateValues = (e) => {
        setValue(Object.assign(values, {[e.target.name]: e.target.value}));
    }

    return (
        <Box
            sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <Box component={'form'} autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={updateValues}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                    id="password"
                    onChange={updateValues}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirm_password"
                    label="Confirm Password"
                    type="password"
                    autoComplete="new-password"
                    id="confirm-password"
                    onChange={updateValues}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Submit
                </Button>
                {messages.map((message, index) =>
                    <Alert key={index} severity={message.type}>
                        {message.text}
                    </Alert>
                )}
            </Box>
        </Box>
    );
}
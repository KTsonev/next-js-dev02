'use client';

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import React, {useState} from 'react';

export default function LoginForm({redirectUrl}) {
    const [values, setValue] = useState({username:'', password: ''});
    const [errors, setError] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        }).then(result  => {
           result.json().then((e) => {
               setError([]);
               if (e.ok) {
                   window.location.replace(redirectUrl);
               } else {
                   setError([e.message.error]);
               }
           });
        });
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
                Sign in
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
                    onChange={updateValues}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={updateValues}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 13, mb: 2 }}
                >
                    Sign In
                </Button>
                {errors.map((error, index) =>
                    <Alert key={index} severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {error}
                    </Alert>
                )};
            </Box>
        </Box>
    )
}
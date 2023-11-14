'use client';

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useState } from 'react';

export default function LoginForm() {
    const [values, setValue] = useState({username:'', password: ''});

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
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
                    onChange={(e) => setValue(Object.assign(values, {username: e.target.value}))}
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
                    onChange={(e) => setValue(Object.assign(values, {password: e.target.value}))}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 13, mb: 2 }}
                >
                    Sign In
                </Button>
            </Box>
        </Box>
    );
}
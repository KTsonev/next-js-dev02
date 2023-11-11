'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Container from "@mui/material/Container";

import LoginForm from "../../components/user/login-form";
import RegisterForm from "../../components/user/register-form";

export default function LoginPage() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ width: '100%', border: 1, typography: 'body1', borderColor: 'divider', borderRadius: '5px' }}>
                <TabContext value={value}>
                    <TabPanel value="1">
                        <LoginForm />
                    </TabPanel>
                    <TabPanel value="2">
                        <RegisterForm />
                    </TabPanel>
                    <TabList centered={true} onChange={handleChange}>
                        <Tab sx={{width: '50%'}} label="Login" value="1" />
                        <Tab sx={{width: '50%'}} label="Register" value="2" />
                    </TabList>
                </TabContext>
            </Box>
        </Container>
    );
}
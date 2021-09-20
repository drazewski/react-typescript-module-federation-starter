import LoginForm from "../components/loginForm/LoginForm";
import React from "react";
import { Box } from '@mui/system';

const LoginView = (): JSX.Element => (
    <Box 
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
            height: 'calc(100vh - 120px)'
        }}
    >
        <LoginForm />
    </Box>
);

export default LoginView;
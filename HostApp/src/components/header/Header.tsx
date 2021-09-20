import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { AuthActionTypes, AuthContext } from "src/context/authContext/AuthContextProvider";
import useAuthService from "src/services/hooks/useAuthService";
import { Box, styled } from '@mui/system';
import { AppBar, Avatar, Container, Typography } from "@mui/material";


const Logout = styled('a')(({ theme }) => ({
    color: theme.palette.primary.main,
    cursor: 'pointer',
    fontSize: 14,
    padding: '6px 12px',
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 4,
    transition: '0.5s all',
    marginRight: 20,

    '&:hover': {
        backgroundColor: '#839aad',
    }
}));

const Header = (): JSX.Element => {
    const history = useHistory();
    const { authState, dispatch } = useContext(AuthContext);
    const { isUserAuthenticated, getUserDetails } = useAuthService();

    const handleLogout = () => {
        dispatch({type: AuthActionTypes.SetLoggedOutStatus});
        history.go(0);
    }

    useEffect(() => {
        if (isUserAuthenticated()) {
            dispatch({type: AuthActionTypes.SetUserIdentification, userIdentification: getUserDetails()});
        }
    }, []);

    return (
        <AppBar sx={{backgroundColor: 'common.white'}}>
            <Container maxWidth={false}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h2" color="primary">COMPANY</Typography>
                    <Box>
                    {authState.isLoggedIn && (
                        <Box display="flex" alignItems="center">
                            <Logout onClick={handleLogout}>logout</Logout>
                            <Avatar />
                        </Box>
                    )}
                    </Box>
                </Box>
            </Container>
        </AppBar>
    );   
}

export default Header;

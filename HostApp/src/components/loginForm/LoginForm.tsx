import React, {useContext, useState} from 'react';
import {Box, styled} from '@mui/system';
import {useHistory} from 'react-router-dom';
import {AuthActionTypes, AuthContext} from 'src/context/authContext/AuthContextProvider';
import {RoutesConfig} from 'src/routing/routeConfigurations';
import {Button, Typography} from '@mui/material';

const LoginInput = styled('input')(({theme}) => ({
    borderRadius: 4,
    border: '1px solid #999',
    backgroundColor: theme.palette.common.white,
    outline: 'none',
    lineHeight: '1.5rem',
    padding: '4px 8px',
    width: 'calc(100% - 16px)'
}));

const LoginForm = (): JSX.Element => {
    const history = useHistory();
    const [username, setUsername] = useState<string>('');
    const {dispatch} = useContext(AuthContext);

    const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUsername(e.target.value);
    };

    const handleLogin = (e: React.SyntheticEvent): void => {
        if (username) {
            e.preventDefault();
            dispatch({type: AuthActionTypes.SetUserIdentification, userIdentification: {username}});

            history.push(RoutesConfig.Dashboard);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                border: '1px solid #999',
                borderRadius: 1,
                backgroundColor: 'common.white',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                justifySelf: 'center',
                py: 2.5,
                px: 5
            }}
        >
            <form>
                <Typography component="h5" variant="h5" sx={{mb: 0.5}}>
                    Login
                </Typography>
                <Typography variant="body2" sx={{mb: 1.5}}>
                    You have to log in if you want to use the application
                </Typography>
                <LoginInput type="text" placeholder="User name" onChange={handleChangeUsername} />
                <Button variant="contained" disabled={!username} sx={{mt: 2}} onClick={handleLogin}>
                    Login
                </Button>
            </form>
        </Box>
    );
};

export default LoginForm;

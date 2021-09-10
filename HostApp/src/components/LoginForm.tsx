import React, { useContext, useState } from "react";
import { useHistory } from 'react-router-dom';
import { AuthActionTypes, AuthContext } from "src/context/authContext/AuthContextProvider";
import { RoutesConfig } from "src/routing/routeConfigurations";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    border: 1px solid #999;
    border-radius: 6px;
    background-color: #eee;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: center;
    justify-self: center;
    padding: 20px 40px 20px;
`;

const LoginInput = styled.input`
    border-radius: 4px;
    border: 1px solid #999;
    background-color: white;
    outline: none;
    line-height: 1.5rem;
    padding: 4px 8px;
    width: calc(100% - 16px);
`;

const Form = styled.form`

`

const Title = styled.h4`
    margin: 0;
`;

const Text = styled.p`
    font-size: 13px;
`;

const LoginButton = styled.button`
    background-color: #384c5d;
    border: 0;
    outline: 0;
    padding: 8px 16px;
    font-size: 14px;
    color: #fff;
    border-radius: 4px;
    margin: 16px 0;
    cursor: pointer;
`

const LoginForm = (): JSX.Element => {
    const history = useHistory();
    const [username, setUsername] = useState<string>('');
    const { dispatch } = useContext(AuthContext);

    const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUsername(e.target.value);
    }

    const handleLogin = (e: React.SyntheticEvent): void => {
        if (username) {
            e.preventDefault();
            dispatch({type: AuthActionTypes.SetUserIdentification, userIdentification: { username }});

            history.push(RoutesConfig.Home);
        }
    }

    return (
        <Wrapper>
            <Form onSubmit={handleLogin}>
                <Title>Login</Title>
                <Text>You have to log in if you want to use the application</Text>
                <LoginInput type="text" placeholder="User name" onChange={handleChangeUsername} />
                <LoginButton>Login</LoginButton>
            </Form>
        </Wrapper>
    );   
}

export default LoginForm;

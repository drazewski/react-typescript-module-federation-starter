import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { AuthActionTypes, AuthContext } from "src/context/authContext/AuthContextProvider";
import useAuthService from "src/services/hooks/useAuthService";
import styled from "styled-components";

const HeaderWrapper = styled.header`
    margin: 0;
    padding: 0 1rem;
    color: #fff;
    background-color: #384c5d;
    display: flex;
    max-width: 100%;
    align-items: center;
    justify-content: space-between;
`;

const Logout = styled.a`
    color: #fff;
    cursor: pointer;
    font-size: 12px;
    padding: 6px 12px;
    border: 1px solid white;
    transition: 0.5s all;
    margin-left: 20px;

    &:hover {
        background-color: #839aad;
    }
`

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
        <HeaderWrapper>
            <h2>Test App</h2>
            {authState.isLoggedIn && (
                <div>{`${authState.userIdentification?.username} `}
                    <Logout onClick={handleLogout}>logout</Logout>
                </div>
            )}
        </HeaderWrapper>
    );   
}

export default Header;

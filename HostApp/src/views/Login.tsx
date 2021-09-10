import LoginForm from "../components/LoginForm";
import React from "react";
import styled from "styled-components";

const ViewFrame = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 120px);
`;

const LoginView = (): JSX.Element => <ViewFrame><LoginForm /></ViewFrame>

export default LoginView;
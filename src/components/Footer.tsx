import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
    align-items: center;
    background-color: #fff;
    border-top: 1px solid #384c5d;
    bottom: 0;
    display: flex;
    height: 35px;
    margin: 0;
    max-width: 100%;
    padding: 0 1rem;
    position: fixed;
    width: 100%;
`;

const FooterText = styled.span`
    cursor: pointer;
    display: inline-block;
    font-size: 10px;
    &:hover {
        text-decoration: underline;
    }
`;

const Footer = (): JSX.Element => {
    return (
        <FooterWrapper>
            <FooterText>Privacy Policy</FooterText>
        </FooterWrapper>
    );   
}

export default Footer;

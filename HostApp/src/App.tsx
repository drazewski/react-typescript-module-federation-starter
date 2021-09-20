import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from "./components/header/Header";
import { RoutesConfig } from "./routing/routeConfigurations";
import LoginView from "./views/Login";
import { AuthContextProvider } from "./context/authContext/AuthContextProvider";
import PrivateRoute from "./routing/PrivateRoute";
import MainView from "./views/Main";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const customTheme = createTheme({
    palette: {
        primary: {
            main: '#3C4C5B',
            contrastText: 'white',
        },
    },
});

const App: React.FC = () => {

    return (
        <BrowserRouter>
            <ThemeProvider theme={customTheme}>
                <CssBaseline/>
                <AuthContextProvider>
                    <Header />
                    <Switch>
                        <Route path={RoutesConfig.Login} component={LoginView} />
                        <PrivateRoute component={MainView} />
                    </Switch>
                </AuthContextProvider>
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default App;

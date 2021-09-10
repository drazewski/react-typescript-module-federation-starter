import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from "./components/Header";
import GlobalStyle from "./globalStyles";
import Footer from "./components/Footer";
import { RoutesConfig } from "./routing/routeConfigurations";
import LoginView from "./views/Login";
import { AuthContextProvider } from "./context/authContext/AuthContextProvider";
import PrivateRoute from "./routing/privateRoute";
import MainView from "./views/Main";

const App: React.FC = () => (
    <BrowserRouter>
        <GlobalStyle />
        <AuthContextProvider>
            <Header />
            <Switch>
                <PrivateRoute exact path={RoutesConfig.Home} component={MainView} />
                <Route path={RoutesConfig.Login} component={LoginView} />
            </Switch>
            <Footer />
        </AuthContextProvider>
    </BrowserRouter>
)

export default App;

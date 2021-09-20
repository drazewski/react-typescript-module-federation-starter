import React from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom'; 
import {Box} from '@mui/system';
import NavBar from 'src/components/NavBar/NavBar';
import PrivateRoute from 'src/routing/PrivateRoute';
import { RoutesConfig } from 'src/routing/routeConfigurations';
import Content from 'src/containers/content/Content';
import Dashboard from 'src/containers/dashboard/Dashboard';

const DashboardRedirect = () => <Redirect to={RoutesConfig.Dashboard} />

const MainView = (): JSX.Element => {
    return (
        <BrowserRouter>
            <NavBar />
            <Box component="main" sx={{m: '73px'}}>  
                <PrivateRoute path={RoutesConfig.Dashboard} component={Content} />
                <PrivateRoute path={RoutesConfig.Content} component={Dashboard} />
                <PrivateRoute exact path={'/'} component={DashboardRedirect} />
            </Box>
        </BrowserRouter>
    );
};

export default MainView;

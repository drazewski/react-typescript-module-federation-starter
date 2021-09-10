import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuthService from 'src/services/hooks/useAuthService';

const PrivateRoute = (props) => {
    const { component: Component, ...rest } = props;
    const { isUserAuthenticated } = useAuthService();

    return (
        <Route
            {...rest}
            render={(componentProps) => {
                if (!isUserAuthenticated()) {
                    return (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: componentProps.location },
                            }}
                        />
                    );
                }

                return <Component {...componentProps} />;
            }}
        />
    );
};

export default PrivateRoute;

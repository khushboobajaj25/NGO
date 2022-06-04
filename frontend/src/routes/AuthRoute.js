import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isUserAuthenticated } from "apis/common";

function AuthRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) =>
                isUserAuthenticated() ? (
                    <Redirect to="/" />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
}

export default AuthRoute;

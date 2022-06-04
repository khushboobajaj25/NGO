import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isUserAuthenticated } from "apis/common";

function PrivateRoute({ component: Component, ...rest }) {
    console.log(rest)
    return (
        <Route
            {...rest}
            render={(props) =>
                isUserAuthenticated() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
}

export default PrivateRoute;

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isUserAutheticated } from "apis/common";

function AuthRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) =>
                isUserAutheticated() ? (
                    <Redirect to="/" />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
}

export default AuthRoute;

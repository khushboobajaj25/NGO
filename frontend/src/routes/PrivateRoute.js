import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isUserAutheticated } from "apis/common";

function PrivateRoute({ component: Component, ...rest }) {
    console.log(rest)
    return (
        <Route
            {...rest}
            render={(props) =>
                isUserAutheticated() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
}

export default PrivateRoute;

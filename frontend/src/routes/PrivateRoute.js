import React, {useContext} from "react";
import {AuthContext} from "../context/Auth";
import Login from "../views/Login";

function PrivateRoute({children}) {

    const token = useContext(AuthContext);

    if (!token) {

        return <Login />;
    }

    return children;
}

export default PrivateRoute;

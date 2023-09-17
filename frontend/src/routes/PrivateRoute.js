import React, {useContext} from "react";
import {AuthContext} from "../context/Auth";
import Login from "../views/Login";
import NotFound from "../views/NotFound";

export default function PrivateRoute({children}) {

    const {token} = useContext(AuthContext);

    if (!token) {

        return <Login/>;
    }

    return children;
}

export function PrivateRouteAdmin({children}) {

    const {token, user} = useContext(AuthContext);

    if (!token) {

        return <Login/>;
    }

    return !user.isAdmin ? < NotFound/> : children;
}

export function PrivateRouteLeader({children}) {

    const {token, user} = useContext(AuthContext);

    if (!token) {

        return <Login/>;
    }

    return !user.isLeader ? < NotFound/> : children;
}
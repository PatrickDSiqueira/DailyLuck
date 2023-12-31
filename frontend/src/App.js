import React, {useContext} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./views/Login";
import Home from "./views/Home";
import {AuthContext} from "./context/Auth";
import Register from "./views/Register";
import PrivateRoute, {PrivateRouteLeader, PrivateRouteAdmin} from "./routes/PrivateRoute";
import NotFound from "./views/NotFound";
import RandomMessage from "./views/RandomMessage";
import TeamMessage from "./views/TeamMessage";
import Users from "./views/Users";
import CreateLeader from "./views/CreateLeader";
import CreateTeamMessage from "./views/CreateTeamMessage";

function App() {

    const {token} = useContext(AuthContext);

    if (token === undefined) {

        return <p>Loading...</p>
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<NotFound/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
                <Route path="/random-message" element={<PrivateRoute><RandomMessage/></PrivateRoute>}/>
                <Route path="/team-message" element={<PrivateRoute><TeamMessage/></PrivateRoute>}/>
                <Route path="/create-team-message" element={<PrivateRouteLeader><CreateTeamMessage/></PrivateRouteLeader>}/>
                <Route path="/users" element={<PrivateRouteAdmin><Users/></PrivateRouteAdmin>}/>
                <Route path="/create-leader" element={<PrivateRouteAdmin><CreateLeader/></PrivateRouteAdmin>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

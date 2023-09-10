import React, {useContext} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./views/Login";
import Home from "./views/Home";
import {AuthContext} from "./context/Auth";
import Register from "./views/Register";
import PrivateRoute from "./routes/PrivateRoute";

function App() {

    const token = useContext(AuthContext);

    if (token === undefined) {

        return <p>Loading...</p>
    }


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/" element={
                    <PrivateRoute>
                        <Home/>
                    </PrivateRoute>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

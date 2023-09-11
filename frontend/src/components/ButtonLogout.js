import {Button} from "primereact/button";
import React from "react";
import {useNavigate} from "react-router-dom";

export default function ButtonLogout() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem('auth_token');
        navigate('/login');
    }

    return <Button label="Logout" type={"submit"} link onClick={logout}/>
}
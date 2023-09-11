import React, {useContext} from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import lucky from "../assets/images/lucky.png";
import {AuthContext} from "../context/Auth";
import ButtonLogout from "./ButtonLogout";
import {useNavigate} from "react-router-dom";

function SideBarMenu() {

    const navigate = useNavigate();

    const items = [
        {
            label: 'Mensagens Aleatórias',
            icon: 'pi pi-history',
            command: () => navigate('/random-message')
        },
        {
            label: 'Mensagens da Equipe',
            icon: 'pi pi-envelope',
            command: () => navigate('/team-message')
        }
    ];

    const start = <img alt="Logo" src={lucky} style={{height:"50px"}} />;

    const end = (
        <ButtonLogout />
    );

    return (
        <div>
            <Menubar model={items} start={start} end={end} />
        </div>
    );
}

export default SideBarMenu;

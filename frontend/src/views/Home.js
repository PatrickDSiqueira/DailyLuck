import SideBarMenu from "../components/SideBarMenu";
import {useContext} from "react";
import {AuthContext} from "../context/Auth";

export default function Home() {

    const {user} = useContext(AuthContext);


    return <>
        <SideBarMenu/>
        {user.firstName}
        {user.lastName}

    </>
}
import SideBarMenu from "../components/SideBarMenu";
import React, {useContext, useRef, useState} from "react";
import {AuthContext} from "../context/Auth";
import {Button} from "primereact/button";
import axios from "axios";
import {Toast} from "primereact/toast";
import {InputTextarea} from "primereact/inputtextarea";
import {useNavigate} from "react-router-dom";

export default function CreateTeamMessage() {

    const {token} = useContext(AuthContext);
    const navigate = useNavigate();

    const toast = useRef(null);

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const createMessage = async () => {
        setLoading(true);

        await axios.post(process.env.REACT_APP_BACKEND_URL + "/direct-messages",
            {message},
            {headers: {Authorization: `Bearer ${token}`}})
            .then(({data}) => {
                if (data.message) {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success',
                        detail: data.message
                    })
                    setMessage('')
                }
            })
            .catch((error) => {
                console.log(error)

                if (error) {
                    toast.current.show({
                        severity: 'warn',
                        summary: 'Error',
                        detail: error.response.data.error
                    })
                }
            })
        setLoading(false);
    }

    return <>
        <SideBarMenu/>
        <Toast ref={toast}/>
        <Toast ref={toast}/>
        <div className="card flex justify-content-center" style={{marginTop:"15px"}}>
            <span className="p-float-label">
                <InputTextarea id="description" value={message} onChange={(e) => setMessage(e.target.value)} rows={5}
                               cols={30}/>
                <label htmlFor="description">Your message to your team</label>
            </span>
        </div>
        <div className="card flex flex-wrap gap-2 justify-content-center">
            <Button loading={loading} onClick={createMessage} icon="pi pi-check" label="Confirm"
                    className="mr-2"></Button>
            <Button icon="pi pi-times" onClick={()=>navigate(-1)} label="Cancel"></Button>
        </div>
    </>
}
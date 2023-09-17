import React, {useContext, useRef, useState} from 'react';
import {Dialog} from 'primereact/dialog';
import {InputTextarea} from "primereact/inputtextarea";
import {Toast} from "primereact/toast";
import {ConfirmDialog} from "primereact/confirmdialog";
import {Button} from "primereact/button";
import {AuthContext} from "../context/Auth";
import axios from "axios";

export default function ModalCreateTeamMessage({isVisible, onHide}) {

    const {token} = useContext(AuthContext);

    const [message, setMessage] = useState('');
    const toast = useRef(null);
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


    return (
        <Dialog
            visible={isVisible}
            onHide={onHide}
            modal={true}
            header="Create Message"
            style={{width: '50vw'}}
        >
            <Toast ref={toast}/>
            <div className="card flex justify-content-center">
            <span className="p-float-label">
                <InputTextarea id="description" value={message} onChange={(e) => setMessage(e.target.value)} rows={5}
                               cols={30}/>
                <label htmlFor="description">Your message to your team</label>
            </span>
            </div>
            <ConfirmDialog/>
            <div className="card flex flex-wrap gap-2 justify-content-center">
                <Button loading={loading} onClick={createMessage} icon="pi pi-check" label="Confirm"
                        className="mr-2"></Button>
                <Button onClick={onHide} icon="pi pi-times" label="Cancel"></Button>
            </div>
        </Dialog>
    );
};
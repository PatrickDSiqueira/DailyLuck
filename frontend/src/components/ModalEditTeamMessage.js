import React, {useContext, useRef, useState} from 'react';
import {Dialog} from 'primereact/dialog';
import {InputTextarea} from "primereact/inputtextarea";
import {Toast} from "primereact/toast";
import {Button} from "primereact/button";
import {AuthContext} from "../context/Auth";
import axios from "axios";

export default function ModalEditTeamMessage({isVisible, onHide, content, id}) {

    const [message, setMessage] = useState(content);
    const {token} = useContext(AuthContext);
    const toast = useRef(null);
    const [loading, setLoading] = useState(false);

    const updateMessage = async () => {
        setLoading(true);

        await axios.patch(process.env.REACT_APP_BACKEND_URL + "/direct-messages",
            {message, id},
            {headers: {Authorization: `Bearer ${token}`}})
            .then(({data}) => {
                if (data.message) {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success',
                        detail: data.message
                    })
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
    const deleteMessage = async () => {
        setLoading(true);

        await axios.delete(process.env.REACT_APP_BACKEND_URL + "/direct-messages/" + id,
            {headers: {Authorization: `Bearer ${token}`}})
            .then(({data}) => {
                if (data.message) {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success',
                        detail: data.message
                    })
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
            header="Edit Message"
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
            <div className="card flex flex-wrap justify-content-center gap-3">
                <Button loading={loading} onClick={updateMessage} disabled={content === message} icon="pi pi-check"
                        label="Save"
                        className="mr-2"></Button>
                <Button severity="secondary" onClick={deleteMessage} icon="pi pi-trash" label="Delete"></Button>
                <Button severity="info" onClick={onHide} icon="pi pi-times" label="Cancel"></Button>
            </div>
        </Dialog>
    );
};
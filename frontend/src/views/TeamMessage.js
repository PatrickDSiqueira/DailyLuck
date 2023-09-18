import SideBarMenu from "../components/SideBarMenu";
import React, {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../context/Auth";
import {Button} from "primereact/button";
import axios from "axios";
import {Toast} from "primereact/toast";
import {Card} from "primereact/card";
import ModalEditTeamMessage from "../components/ModalEditTeamMessage";

export default function TeamMessage() {

    const {token, user} = useContext(AuthContext);

    const isLeader = user.isLeader;

    const [modalVisible, setModalVisible] = useState(false);
    const [contentMessage, setContentMessage] = useState('');
    const [messageId, setMessageId] = useState();

    const showModal = () => {

        setModalVisible(true);
    };

    const hideModalEdit = () => {
        setContentMessage('');
        setModalVisible(false);
    };

    const [messageTeamList, setMessageTeamList] = useState([]);

    const toast = useRef(null);


    useEffect(() => {
        const getMessagesTeamList = async () => {

            await axios.get(process.env.REACT_APP_BACKEND_URL + "/direct-messages",
                {
                    headers: {Authorization: `Bearer ${token}`}
                })
                .then(({data}) => {

                    setMessageTeamList(data.messages)
                })
                .catch(({response}) => {

                    if (response) {
                        toast.current.show({
                            severity: 'warn',
                            summary: 'Error',
                            detail: response.data.error
                        })
                    }
                })
        }

        getMessagesTeamList();
// eslint-disable-next-linefe
    }, []);

    const editMessage = async ({id, message}) => {

        await setContentMessage(message);

        setMessageId(id);

        showModal();
    }

    return <>
        <SideBarMenu/>
        <Toast ref={toast}/>
        {isLeader && <>
            <ModalEditTeamMessage id={messageId} content={contentMessage} isVisible={modalVisible}
                                  onHide={hideModalEdit}/>
        </>}
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
            {messageTeamList.map(({message, id}, index) => (
                    <Card key={index} className="md:w-25rem" style={{margin: "5px", flexBasis: "calc(33.33% - 10px)"}}
                          footer={isLeader && <Button label="Edit" icon="pi pi-pencil" onClick={() => editMessage({
                              id,
                              message
                          })}/>}>
                        <p className="m-0">{message}</p>
                    </Card>
                )
            )}
        </div>
    </>
}
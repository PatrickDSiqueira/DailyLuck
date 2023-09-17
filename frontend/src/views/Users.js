import SideBarMenu from "../components/SideBarMenu";
import React, {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../context/Auth";
import axios from "axios";
import {Toast} from "primereact/toast";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {InputSwitch} from "primereact/inputswitch";
import {ConfirmDialog, confirmDialog} from 'primereact/confirmdialog';

export default function TeamMessage() {

    const {token, user} = useContext(AuthContext);

    const isAdmin = user.isAdmin;

    const [userList, setUserList] = useState([]);

    const toast = useRef(null);

    useEffect(() => {
        const getAllUsers = async () => {

            await axios.get(process.env.REACT_APP_BACKEND_URL + "/users",
                {
                    headers: {Authorization: `Bearer ${token}`}
                })
                .then(({data}) => {
                    console.log(data)
                    setUserList(data)
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

        getAllUsers();
// eslint-disable-next-linefe
    }, []);

    const isActiveSymbol = (data) => {
        return <InputSwitch checked={data.isActive} onChange={() => confirmSetActive(data.id, data.isActive)}/>
    }

    const setActive = async (id) => {

        await axios.patch(process.env.REACT_APP_BACKEND_URL + "/users/",
            {id},
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            .then((response) => {

                toast.current.show({
                    severity: 'success',
                    summary: 'Success',
                    detail: response.data.message,
                    life: 3000
                });
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


    const confirmSetActive = (userId, statusUser) => {
        confirmDialog({
            message: `Are you sure you want to ${statusUser ? 'desable' : 'enable'} this user?`,
            icon: 'pi pi-exclamation-triangle',
            accept: () => setActive(userId),
        });
    }

    return <>
        <SideBarMenu/>
        <Toast ref={toast}/>
        <ConfirmDialog/>

        <DataTable value={userList} paginator rows={5} tableStyle={{minWidth: '50rem'}}>
            <Column field="firstName" header="First Name" sortable style={{width: '25%'}}></Column>
            <Column field="lastName" header="Last Name" sortable style={{width: '25%'}}></Column>
            <Column field="cpf" header="CPF" sortable style={{width: '25%'}}></Column>
            <Column field="accessType.name" header="Access" sortable style={{width: '25%'}}></Column>
            <Column field="team.name" header="Team" sortable style={{width: '25%'}}></Column>
            <Column field="isActive" header="Active" sortable dataType="boolean" body={isActiveSymbol}
                    style={{width: '25%'}}></Column>
        </DataTable>
    </>
}
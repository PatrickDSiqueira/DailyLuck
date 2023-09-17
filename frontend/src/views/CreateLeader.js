import InputCpf from "../components/InputCpf";
import {Button} from "primereact/button";
import {useContext, useEffect, useRef, useState} from "react";
import {Dropdown} from 'primereact/dropdown';
import {InputText} from "primereact/inputtext";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import validateCPF from "../Utils/cpf"
import {Toast} from 'primereact/toast';
import {AuthContext} from "../context/Auth";
import SideBarMenu from "../components/SideBarMenu";

export default function CreateLeader() {

    const navigate = useNavigate();
    const toast = useRef(null);

    const [cpf, setCpf] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastname] = useState();
    const [selectedIdTeam, setSelectedIdTeam] = useState();
    const [listTeam, setListTeam] = useState();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const {token, user} = useContext(AuthContext);


    useEffect(() => {

        const getTeamList = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/team-list');
                if (response.status === 200) {
                    setListTeam(response.data);
                }
            } catch (error) {
                console.error("Erro ao buscar a lista de equipes:", error);
            }
        };

        getTeamList();
    }, []);

    const styleForm = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const createLeader = async () => {

        setLoading(true);
        setErrors({});

        let isValid = true;

        if (!cpf) {

            setErrors((prevErrors) => ({
                ...prevErrors,
                cpf: "* Cpf is required",
            }));

            isValid = false;

        } else if (!validateCPF(cpf)) {

            setErrors((prevErrors) => ({
                ...prevErrors,
                cpf: "* Cpf is not valid",
            }));

            isValid = false;
        }

        if (!firstName) {

            setErrors((prevErrors) => ({
                ...prevErrors,
                firstName: "* First Name is required",
            }));
            isValid = false;
        }

        if (!lastName) {

            setErrors((prevErrors) => ({
                ...prevErrors,
                lastName: "* First Name is required",
            }));
            isValid = false;
        }

        if (!selectedIdTeam) {

            setErrors((prevErrors) => ({
                ...prevErrors,
                team: "* Team is required",
            }));
            isValid = false;
        }

        if (isValid) {

            const params = {
                cpf,
                first_name: firstName,
                last_name: lastName,
                team_id: selectedIdTeam.id
            };

            await axios.post(process.env.REACT_APP_BACKEND_URL + '/user-leader', params, {
                headers: {Authorization: `Bearer ${token}`}
            })
                .then((response) => {

                    toast.current.show({
                        severity: 'success',
                        summary: 'Done',
                        detail: response.data.firstName + " created"
                    });

                    navigate('/users')
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
        } else {

            toast.current.show({
                severity: 'warn',
                summary: 'Error',
                detail: 'Please fill out the required fields'
            })

        }
        setLoading(false)
    }

    const getFormErrorMessage = (name) => {
        return errors[name]
            ? <small className="p-error">{errors[name]}</small>
            : <small className="p-error">&nbsp;</small>;
    };

    return (
        <div>
            <SideBarMenu/>
            <div style={styleForm}>
                <Toast ref={toast}/>
                <h2 style={{marginTop: "12px"}}>Register Leader</h2>
                <InputCpf setCpf={setCpf} error={getFormErrorMessage('cpf')}/>
                <div className="flex flex-column gap-2">
                    <label htmlFor="input-first-name">First Name:</label>
                    <InputText id="input-first-name" onChange={(e) => {
                        setFirstName(e.target.value)
                    }}/>
                    {getFormErrorMessage('firstName')}
                </div>
                <div className="flex flex-column gap-2">
                    <label htmlFor="input-last-name">Last Name:</label>
                    <InputText id="input-last-name" onChange={(e) => setLastname(e.target.value)}/>
                    {getFormErrorMessage('lastName')}
                </div>
                <div className="flex flex-column gap-2">
                    <label htmlFor="input-team">Team:</label>
                    <Dropdown value={selectedIdTeam} onChange={(e) => setSelectedIdTeam(e.value)} options={listTeam}
                              optionLabel="name"
                              placeholder="Select a Team"
                              className="w-full md:w-13rem"/>
                    {getFormErrorMessage('team')}
                </div>
                <div className={"card flex justify-content-center"}>
                    <Button label={"Back"} icon={'pi pi-open'} severity={"secondary"}
                            onClick={() => navigate(-1)} />
                    <Button label={"Create"} icon={'pi pi-open'} severity={"info"}
                            loading={loading} onClick={createLeader} style={{marginLeft: "12px"}}/>
                </div>
            </div>
        </div>
    )
}
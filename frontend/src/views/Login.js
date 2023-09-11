import {Button} from "primereact/button";
import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import InputCpf from "../components/InputCpf";
import validateCPF from "../Utils/cpf";
import {Toast} from "primereact/toast";


export default function Login() {

    const navigate = useNavigate();
    const [loadingLogin, setLoadingLogin] = useState(false);

    const [cpf, setCpf] = useState();
    const [errors, setErrors] = useState({});

    const toast = useRef();

    const urlBackend = process.env.REACT_APP_BACKEND_URL;

    const navigateToRegister = () => {
        navigate('/register');
    };


    const login = async () => {

        setLoadingLogin(true);
        setErrors({});

        let isValid = true;

        if (!cpf) {

            setErrors((prevErrors) => ({
                ...prevErrors,
                ['cpf']: "* Cpf is required",
            }));

            isValid = false;

        } else if (!validateCPF(cpf)) {

            setErrors((prevErrors) => ({
                ...prevErrors,
                ['cpf']: "* Cpf is not valid",
            }));

            isValid = false;
        }

        if (isValid) {

            await axios.post(`${urlBackend}/login`, {cpf})
                .then((response) => {
                    localStorage.setItem('auth_token', response.data.token);
                    navigate('/')
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


        setLoadingLogin(false);
    }

    const getFormErrorMessage = (name) => {
        return errors[name]
            ? <small className="p-error">{errors[name]}</small>
            : <small className="p-error">&nbsp;</small>;
    };

    const styleForm = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const styleSpan = {
        marginTop: '12px'
    };

    return (
        <div>
            <div style={styleForm}>
                <Toast ref={toast}/>
                <h2 style={styleSpan}>Login</h2>
                <InputCpf error={getFormErrorMessage('cpf')} setCpf={setCpf}/>
                <div className={"card flex justify-content-center"} style={styleSpan}>
                    <Button label={"login"} icon={'pi pi-open'} severity={"info"}
                            loading={loadingLogin} onClick={login}/>
                </div>
                <div className={"card flex justify-content-center"}>
                    <Button label={"Cadastre-se"} type={"submit"} link style={{fontSize: '12px'}}
                            onClick={navigateToRegister}/>
                </div>
            </div>
        </div>
    )
}
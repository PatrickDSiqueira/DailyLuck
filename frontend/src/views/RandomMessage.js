import SideBarMenu from "../components/SideBarMenu";
import {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../context/Auth";
import CardMessage from "../components/CardMessage";
import {Button} from "primereact/button";
import axios from "axios";
import {Toast} from "primereact/toast";

export default function RandomMessage() {

    const {token} = useContext(AuthContext);

    const [actualMessage, setActualMessage] = useState({});
    const [nextMessageIn, setNextMessageIn] = useState(false);
    const [labelCounterDate, setLabelCounterDate] = useState(false);
    const [loading, setLoading] = useState(false);

    const toast = useRef(null);


    const getAnotherMessage = async () => {

        setLoading(true);

        await axios.get(process.env.REACT_APP_BACKEND_URL + "/new-random-message",
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            .then(({data}) => {

                if (data.update_on) {

                    setNextMessageIn(data.update_on);

                    toast.current.show({
                        severity: 'info',
                        summary: 'Info',
                        detail: 'You have used your 4 daily messages'
                    });

                } else {

                    setActualMessage(data.message.result)

                    toast.current.show({
                        severity: 'success',
                        summary: 'Done',
                        detail: 'New Message Generate'
                    });
                }
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
        setLoading(false)
    }

    useEffect(() => {

        function countdownTimer() {

            if (!nextMessageIn) {
                setLabelCounterDate('No date');
                return;
            }

            const currentTime = new Date().getTime();
            const timeRemaining = new Date(nextMessageIn) - currentTime;

            if (timeRemaining <= 0) {
                setLabelCounterDate('Expirado');
                return;
            }

            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            setLabelCounterDate(`Next Messages in ${hours} horas, ${minutes} minutos, ${seconds} segundos`);
        }

        countdownTimer();

        const intervalId = setInterval(countdownTimer, 1000);

        return () => clearInterval(intervalId);


    }, [nextMessageIn]);

    useEffect(() => {
        const getRandomMessage = async () => {

            setLoading(true);

            await axios.get(process.env.REACT_APP_BACKEND_URL + "/random-message",
                {
                    headers: {Authorization: `Bearer ${token}`}
                })
                .then(({data}) => {

                    console.log(data)

                    if (data.update_on) {

                        setNextMessageIn(data.update_on);

                    }

                    if (data.message.result) {

                        setActualMessage(data.message.result)
                    } else {
                        console.log(200)
                    }

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
            setLoading(false)
        }

        getRandomMessage();
// eslint-disable-next-line
    }, []);

    return <>
        <Toast ref={toast}/>
        <SideBarMenu/>
        <div className="card flex justify-content-center" style={{marginTop:"20px", marginBottom:"20px"}}>
            <CardMessage messageEn={actualMessage.en} messagePt={actualMessage.pt}/>
        </div>
        <div className="card flex justify-content-center">
            {nextMessageIn
                ? <Button label={labelCounterDate} disabled type={"submit"} icon="pi pi-clock"
                          style={{fontSize: '12px'}}/>
                : <Button label="Another Message" loading={loading} type={"submit"}
                          style={{fontSize: '12px'}}
                          onClick={getAnotherMessage}/>
            }
        </div>

    </>
}
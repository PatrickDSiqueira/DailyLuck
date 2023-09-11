import SideBarMenu from "../components/SideBarMenu";
import {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../context/Auth";
import CardMessage from "../components/CardMessage";
import {Button} from "primereact/button";
import axios from "axios";
import {Toast} from "primereact/toast";

export default function RandomMessage() {

    const {token, user} = useContext(AuthContext);

    const [messageList, setMessageList] = useState([]);
    const [nextMessageIn, setNextMessageIn] = useState(false);
    const [labelCounterDate, setLabelCounterDate] = useState(false);
    const [loading, setLoading] = useState(false);

    const toast = useRef(null);

    const getAnotherMessage = async () => {

        setLoading(true);

        await axios.get(process.env.REACT_APP_BACKEND_URL + "/random-message",
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

                    setMessageList(prevList => [...prevList, data.result])

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


    return <>
        <Toast ref={toast}/>
        <SideBarMenu/>
        <div>
            {messageList.map((message) => {

                return <CardMessage messageEn={message.en} messagePt={message.pt}/>
            })}
        </div>
        <div className="card flex justify-content-center">
            {!nextMessageIn &&
            <Button label="Another Message" loading={loading} type={"submit"}
                    style={{fontSize: '12px'}}
                    onClick={getAnotherMessage}/>
            }

            {nextMessageIn &&
            <Button label={labelCounterDate} disabled type={"submit"} icon="pi pi-clock"
                    style={{fontSize: '12px'}}/>
            }
        </div>

    </>
}
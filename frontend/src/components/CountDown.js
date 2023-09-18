import React, { useState, useEffect } from 'react';

export default function CountDown ({ targetDate })  {
    const [timeRemaining, setTimeRemaining] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentDate = new Date();
            const difference = targetDate - currentDate;

            if (difference <= 0) {
                clearInterval(interval);
                setTimeRemaining('Tempo expirado');

            } else {

                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    console.log(timeRemaining)

    return <span>{timeRemaining}</span>;
}
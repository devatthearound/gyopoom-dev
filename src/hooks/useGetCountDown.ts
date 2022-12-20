import { useEffect, useState } from "react"

const useGetCountDown = (initMinutes: number, initSeconds: number) => {
    const [minutes, setMinutes] = useState<number>(initMinutes)
    const [seconds, setSeconds] = useState<number>(initSeconds)

    useEffect(() => {
        const countdown = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(countdown);
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000);

        return () => clearInterval(countdown);
    })


    const resetButton = () => {
        setMinutes(initMinutes)
        setSeconds(initSeconds)
    }

    return { seconds, minutes, resetButton }
}

export default useGetCountDown
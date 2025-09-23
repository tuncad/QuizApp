import {useState, useEffect} from 'react';

export default function QuestionTimer({ timeOut, onTimeout }) {
    const [timeLeft, setTimeLeft] = useState(timeOut);

    useEffect(() => { 
        setTimeout(onTimeout, timeOut);
     }, [timeOut, onTimeout]);
     
    useEffect(() => {
     var interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 100);
    }, 100);
        return () => clearInterval(interval);
    }, []);
    
    return <progress id="question-time" max={timeOut} value={timeLeft} ></progress>;
}
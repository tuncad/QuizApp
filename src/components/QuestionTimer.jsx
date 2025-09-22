import {useState, useEffect} from 'react';

export default function QuestionTimer({ timeOut, onTimeout }) {
    const [timeLeft, setTimeLeft] = useState(timeOut);

    useEffect(() => { 
        setTimeout(onTimeout, timeOut);
     }, [timeOut, onTimeout]);

    

    useEffect(() => {
     setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 100);
    }, 100);}, []);
    
    return <progress id="question-time" max={timeOut} value={timeLeft} ></progress>;
}
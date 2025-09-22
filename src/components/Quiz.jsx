import { useState } from "react";
import QUESTIONS from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    function handleAnswer(answer) {
        setUserAnswers([...userAnswers, answer]);
    }

    if(quizIsComplete)
    {
        return (
        <div id = "summary">
            <img src={quizCompleteImg}W alt="Celebration" />
            <h2> Quiz Complete! </h2>
        </div>
        );
    }

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
     <div id="question">
      <QuestionTimer 
        timeOut={10000}
        onTimeout={()=> handleAnswer(null)} 
       />
      <h2> {QUESTIONS[activeQuestionIndex].text} </h2>
      <ul id="answers">
        {shuffledAnswers.map((answer) => (
          <li key={answer} className = "answer"> 
          <button onClick={ () => handleAnswer(answer)}> {answer} </button>
          </li>
            ))}
       </ul>
    </div>
    </div>
  );
}
import { useState, useCallback, useRef } from "react";
import QUESTIONS from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
    const shuffledAnswers = useRef();
    const [answerState, setAnswerState] = useState('');
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length-1;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleAnswer(selectedAnswer) {
        setAnswerState('answered');
        setUserAnswers((prevUserAnswers) => {
          return [...prevUserAnswers, selectedAnswer];
        });
        setTimeout(() => {
          if(selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
            setAnswerState('correct');
          } else {
            setAnswerState('wrong');
          }
          setTimeout(() => {
            setAnswerState('');
          }, 2000)
        }, 1000);
      } , [activeQuestionIndex]);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if(quizIsComplete)
    {
        return (
        <div id = "summary">
            <img src={quizCompleteImg} alt="Celebration" />
            <h2> Quiz Complete! </h2>
        </div>
        );
    }

    if(!shuffledAnswers.current)
    {
      shuffledAnswers.current = [...QUESTIONS[activeQuestionIndex].answers];
      shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }

  return (
    <div id="quiz">
     <div id="question">
      <QuestionTimer
        key={activeQuestionIndex} 
        timeOut={10000}
        onTimeout={handleSkipAnswer}
       />
      <h2> {QUESTIONS[activeQuestionIndex].text} </h2>
      <ul id="answers">
        {shuffledAnswers.current.map((answer) => {
            const isSelected =userAnswers[userAnswers.length - 1] === answer;
            let cssClass = '';

            if(answerState === 'answered' && isSelected) {
              cssClass = 'selected';
            }

            if((answerState === 'correct' || answerState === 'wrong') && isSelected) {
              cssClass = answerState;
            }

            return (
            <li key={answer} className = "answer"> 
          <button onClick={ () => handleSelectAnswer(answer)}> {answer} className = {cssClass} </button>
          </li>
            );
          })}
       </ul>
    </div>
    </div>
  );
}
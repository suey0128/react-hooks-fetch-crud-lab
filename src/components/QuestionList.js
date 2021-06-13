import React, { useEffect } from "react";
import QuestionItem from "./QuestionItem"

function QuestionList({ questionList, questionListSetter }) {

  //fetch questionList from the server and display via useEffect
  useEffect(()=>{
    fetch('http://localhost:4000/questions')
    .then(res => res.json())
    .then(data => questionListSetter(data) )
    .catch(error => console.error('Error:', error))  
    }
    ,[])
    
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionList.map((question) => <QuestionItem 
      key={question.id} 
      question={question}
      questionList={questionList}
      questionListSetter={questionListSetter}
      />)}</ul>
    </section>
  );
}

export default QuestionList;

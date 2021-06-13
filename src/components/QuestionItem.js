import React, { useState } from "react";

function QuestionItem({ question, questionList, questionListSetter }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const deleteHandler = (id) => {
    //delete from database 
    fetch(`http://localhost:4000/questions/${id}`, { 
      method: 'DELETE',
    })
    .catch(error => console.error('Error:', error))
    
    //setQuestionList
    const newQList = questionList.filter(eachQuestion => eachQuestion.id !== id)
    questionListSetter(newQList)
  }

  //onChange event function => change the object, patch the database, render dom
  const handleCorrectAnswer = (e, id) => {

    fetch(`http://localhost:4000/questions/${id}`, { 
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({correctIndex:e.target.value})
      })
      //  .then(res => res.json())
      // .then(data => console.log(data) )
      .catch(error => console.error('Error:', error))

    const newQList = questionList.map((eachQuestion) => {
      if (eachQuestion.id === id) {
        return {
          ...eachQuestion, correctIndex:e.target.value
        }
      } else {
        return eachQuestion
      }
    })
    questionListSetter(newQList)
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={(e)=>{handleCorrectAnswer(e,id)}} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={(e)=>{deleteHandler(id)}}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;

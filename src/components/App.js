import React, { useState,useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");

  //set state var to track questionList change
  const [questionList, questionListSetter] = useState([])

  //callback function on the new question submit form
  const onSubmit = (newQuestionObj) => {
    questionListSetter([...questionList,newQuestionObj])
  }



  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onSubmit={onSubmit}/> : 
      <QuestionList 
      questionList={questionList}
      questionListSetter={questionListSetter}
      />}
    </main>
  );
}

export default App;

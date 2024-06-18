import React, { useState } from "react";
import styled from "styled-components";

const SurveyForm = ({ onSave, onCancel }) => {
  const [questions, setQuestions] = useState([{ question: "", options: ["", ""] }]);

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", ""] }]);
  };

  const addOption = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push("");
    setQuestions(newQuestions);
  };

  const handleSave = () => {
    onSave(questions);
  };

  return (
    <SurveyWrapper>
      {questions.map((q, qIndex) => (
        <QuestionWrapper key={qIndex}>
          <input
            type="text"
            value={q.question}
            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
            placeholder="질문을 입력하세요"
          />
          {q.options.map((option, oIndex) => (
            <input
              key={oIndex}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
              placeholder={`옵션 ${oIndex + 1}`}
            />
          ))}
          <button onClick={() => addOption(qIndex)}>옵션 추가</button>
        </QuestionWrapper>
      ))}
      <button onClick={addQuestion}>질문 추가</button>
      <button onClick={handleSave}>저장</button>
      <button onClick={onCancel}>취소</button>
    </SurveyWrapper>
  );
};

const SurveyWrapper = styled.div`
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const QuestionWrapper = styled.div`
  margin-bottom: 20px;

  input {
    display: block;
    margin-bottom: 10px;
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  button {
    margin-right: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    cursor: pointer;
  }
`;

export default SurveyForm;

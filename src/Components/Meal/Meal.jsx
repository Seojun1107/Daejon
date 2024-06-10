import React from "react";
import styled from "styled-components";

const MealDiv = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  padding: 20px;
  margin-top: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const MealTitle = styled.h3`
  font-size: 22px;
  margin-bottom: 20px;
  color: #2c3e50;
`;

const MealContent = styled.p`
  font-size: 16px;
  color: #7f8c8d;
  line-height: calc(100% + 15px);
`;

const ChangeButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: #ffffff;
  background-color: #3498db;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #2980b9;
  }
`;

const Meal = ({ title, mealContent, onChangeSchool }) => (
  <MealDiv>
    <MealTitle>{title}</MealTitle>
    {onChangeSchool && (
      <ChangeButton onClick={onChangeSchool}>학교 변경</ChangeButton>
    )}
    <MealContent
      dangerouslySetInnerHTML={{
        __html: mealContent.replace(/<br\/>/g, "<br/>"),
      }}
    />
  </MealDiv>
);

export default Meal;

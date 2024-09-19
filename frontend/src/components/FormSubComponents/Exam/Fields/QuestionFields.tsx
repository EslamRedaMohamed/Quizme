import React from "react";
import MCQFields from "./MCQFields";
import CodingFields from "./CodingFields";
interface QuestionFieldsProps {
  index: number;
  question: {
    desc: string;
    type: string;
    grade: number;
  };
}

const QuestionFields = ({ index, question }: QuestionFieldsProps) => {
  return (
    <>
      {question.type === "mcq" && (
        <MCQFields index={index} question={question} />
      )}
      {question.type === "code" && (
        <CodingFields index={index} watchedQuestions={question} />
      )}
    </>
  );
};

export default QuestionFields;

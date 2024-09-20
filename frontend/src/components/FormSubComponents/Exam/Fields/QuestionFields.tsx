import React from "react";
import MCQFields, { MCQFieldsProps } from "./MCQFields";
import CodingFields, { CodingFieldsProps } from "./CodingFields";
export interface QuestionFieldsProps {
  index: number;
  question: {
    desc: string;
    type: string;
    grade: number;
    choices?: { desc: string; isCorrect: boolean }[];
    code?: string;
    testCases?: { input: string; output: boolean }[];
  };
}

const QuestionFields = React.memo(
  ({ index, question }: QuestionFieldsProps) => {
    return (
      <>
        {question.type === "mcq" && (
          <MCQFields
            index={index}
            question={question as MCQFieldsProps["question"]}
          />
        )}
        {question.type === "code" && (
          <CodingFields
            index={index}
            question={question as CodingFieldsProps["question"]}
          />
        )}
      </>
    );
  }
);

export default QuestionFields;

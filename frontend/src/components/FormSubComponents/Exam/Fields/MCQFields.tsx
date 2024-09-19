import { useFormContext, useFieldArray } from "react-hook-form";
import MarkdownViewer from "../../../Viewers/MarkdownViewer";
import { useEffect } from "react";

interface MCQFieldsProps {
  index: number;
  question: {
    desc: string;
    type: string;
    grade: number;
  };
}

const MCQFields = ({ index, question }: MCQFieldsProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: `choices`,
    control,
  });

  useEffect(() => {
    if (fields.length < 2) {
      for (let index = fields.length; index < 2; index++) {
        append({ desc: "", correct: false });
      }
    }
  }, [append, fields.length]);
  const descError =
    Array.isArray(errors?.questions) && errors.questions[index]?.desc ? (
      <p className="text-red-600">This field is required</p>
    ) : null;

  const gradeError =
    Array.isArray(errors?.questions) && errors.questions[index]?.grade ? (
      <p className="text-red-600">
        This field is required and must be a number greater than 0
      </p>
    ) : null;
  const choicesError =
    Array.isArray(errors?.questions) && errors.questions[index]?.choices
      ? errors.questions[index].choices.message
      : null;
  return (
    <>
      <div className="flex [&>*]:w-1/2 gap-2 sm:[&>*]:w-full">
        <textarea
          className="border-2 border-gray-300 rounded p-2"
          {...register(`questions.${index}.desc`, { required: true })}
          placeholder={`Question ${index + 1} Description`}
        />
        <MarkdownViewer input={question.desc} />
      </div>
      {descError}
      <input
        type="number"
        {...register(`questions.${index}.grade`, {
          required: true,
          min: 1,
        })}
        placeholder={`Question ${index + 1} Grade`}
      />
      {gradeError}
      <div className="flex flex-col gap-2 [&_input]:max-h-[30px]">
        <div className="flex justify-between w-1/2">
          <h3 className="text-l font-bold tracking-widest">Choices</h3>
          <button
            className="bg-gray-950 hover:bg-gray-500 text-white font-bold py-1 px-2 rounded-md transition text-sm"
            onClick={() => append({ desc: "", isCorrect: false })}
            type="button"
          >
            Add Choice
          </button>
        </div>
        {fields.map((item, index) => (
          <div
            className="flex gap-2 w-1/2 border p-2 rounded items-center"
            key={item.id}
          >
            <input
              type="text"
              {...register(`choices.${index}.desc`, {
                required: true,
                minLength: 1,
              })}
            />
            <input
              type="checkbox"
              title="Correct Answer"
              {...register(`choices.${index}.isCorrect`, { required: true })}
            />
            <button
              className="bg-gray-950 hover:bg-gray-500 text-white font-bold py-1 px-2 rounded-md transition text-sm"
              onClick={() => remove(index)}
              type="button"
            >
              Remove Choice
            </button>
            {choicesError && <p className="text-red-600">{choicesError}</p>}
          </div>
        ))}
      </div>
    </>
  );
};

export default MCQFields;

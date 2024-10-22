import { useFormContext, useFieldArray } from "react-hook-form";
import QuestionFields from "./Fields/QuestionFields";
import { useEffect } from "react";
import QuestionBankModal from "./QuestionBankModal";

interface QuestionField {
  id?: string;
  desc: string;
  type: string;
  grade: string;
  choices: any[];
  testCases: any[];
  code: any[];
  tags: string[];
  difficulty: string;
}

const QuestionsStep = () => {
  const { register, control, getValues, setValue, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  // Watch the questions array for changes
  const watchQuestions = watch("questions");

  useEffect(() => {
    // Only append a new question if there are no questions and no existing data
    if (
      fields.length === 0 &&
      (!watchQuestions || watchQuestions.length === 0)
    ) {
      append({
        id: "", // Add id field for tracking existing questions
        desc: "",
        type: "mcq", // Set a default type
        grade: "",
        choices: [],
        testCases: [],
        code: [],
        tags: [],
        difficulty: "easy", // Set a default difficulty
      });
    }
  }, [append, fields.length, watchQuestions]);

  const handleTagInputBlur = (index: number) => {
    const tagsInput = getValues(`questions.${index}.tags`);
    let tagsArray: string[] = [];

    // Handle both string and array inputs
    if (typeof tagsInput === "string") {
      tagsArray = tagsInput
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");
    } else if (Array.isArray(tagsInput)) {
      tagsArray = tagsInput;
    }

    setValue(`questions.${index}.tags`, tagsArray);
  };

  const handleReset = (index: number) => {
    const currentQuestion = watchQuestions[index];
    const resetQuestion = {
      id: currentQuestion.id || "", // Preserve the id if it exists
      desc: "",
      type: "mcq",
      grade: "",
      choices: [],
      testCases: [],
      code: [],
      tags: [],
      difficulty: "easy",
    };
    setValue(`questions.${index}`, resetQuestion);
  };

  const handleAppendQuestion = () => {
    append({
      id: "",
      desc: "",
      type: "mcq",
      grade: "",
      choices: [],
      testCases: [],
      code: [],
      tags: [],
      difficulty: "easy",
    });
  };

  const handleRemoveQuestion = (index: number) => {
    // Prevent removing the last question
    if (fields.length > 1) {
      remove(index);
    }
  };
  const handleQuestionBankSelection = (selectedQuestion: any) => {
    const currentScroll = window.scrollY;
    append({
      ...selectedQuestion,
      // Ensure all required fields are included
      choices: selectedQuestion.choices || [],
      testCases: selectedQuestion.testCases || [],
      code: selectedQuestion.code || [],
    });
    setTimeout(() => {
      window.scrollTo(0, currentScroll);
    }, 0);
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <QuestionBankModal onSelectQuestion={handleQuestionBankSelection} />
      </div>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg"
        >
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Question {index + 1}
              </h2>
              <select
                className="bg-white text-gray-800 border-2 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                {...register(`questions.${index}.type`, { required: true })}
                defaultValue="mcq"
              >
                <option value="mcq">MCQ</option>
                <option value="code">Code</option>
              </select>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <QuestionFields index={index} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags
                </label>
                <input
                  type="text"
                  className="w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  {...register(`questions.${index}.tags`)}
                  placeholder="Comma separated tags"
                  onBlur={() => handleTagInputBlur(index)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty
                </label>
                <select
                  className="w-full bg-white border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  {...register(`questions.${index}.difficulty`)}
                  defaultValue="easy"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                onClick={() => handleReset(index)}
              >
                Reset
              </button>
              <button
                className="px-4 py-2 border border-transparent rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
                type="button"
                onClick={() => handleRemoveQuestion(index)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
      <button
        className="w-full px-6 py-3 border border-transparent rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300"
        type="button"
        onClick={handleAppendQuestion}
      >
        Add Question
      </button>
    </div>
  );
};

export default QuestionsStep;

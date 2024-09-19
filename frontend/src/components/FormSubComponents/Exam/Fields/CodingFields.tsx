import { useFormContext, useFieldArray } from "react-hook-form";

interface CodingFieldsProps {
  index: number;
  question: {
    desc: string;
    type: string;
    grade: number;
  };
}

const CodingFields = () => {
  const { register } = useFormContext();
  return <div>CodingFields</div>;
};

export default CodingFields;

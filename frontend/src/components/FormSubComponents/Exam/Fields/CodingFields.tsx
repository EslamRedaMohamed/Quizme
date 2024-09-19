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
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: "testcasses",
    control,
  });
  return <div>CodingFields</div>;
};

export default CodingFields;

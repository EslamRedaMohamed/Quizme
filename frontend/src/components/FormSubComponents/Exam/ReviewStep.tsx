import { useFormContext } from "react-hook-form";
import {
  JsonView,
  allExpanded,
  darkStyles,
  defaultStyles,
} from "react-json-view-lite";
const ReviewStep = () => {
  const { watch } = useFormContext();
  const formWatch = watch();
  return (
    <JsonView
      data={formWatch}
      shouldExpandNode={allExpanded}
      style={defaultStyles}
    />
  );
};

export default ReviewStep;

export const projectProgressUpdateValidation = (formData) => {
  const errors = {};
  if (
    formData.completion_percentage < 0 ||
    formData.completion_percentage > 100
  ) {
    errors.completion_percentage =
      "Completion percentage should be between 0 and 100%";
  } else if (formData.completion_percentage > formData.completion_percentage) {
    errors.completion_percentage =
      "Completion percentage should be less than 100%";
  }
  if (formData.milestones.length === 0)
    errors.milestones = "Milestones are required";
  return errors;
};

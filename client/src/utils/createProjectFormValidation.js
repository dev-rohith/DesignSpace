import { validateAddress } from "./DesingerProfileValidation";

export function validateCreateProjectData(formData) {
  const errors = {};

  if (!formData.title) errors.title = "Project title is required";
  if (!formData.description) errors.description = "Description is required";
  if (!formData.client) errors.client = "Client selection is required";
  if (!formData.minimumDays) errors.minimumDays = "Minimum days is required";
  if (!formData.budget) errors.budget = "Budget is required";

  const addressErrors = validateAddress(formData.address);
  if (Object.keys(addressErrors).length > 0) {
    errors.address = addressErrors;
  }

  return errors;
}

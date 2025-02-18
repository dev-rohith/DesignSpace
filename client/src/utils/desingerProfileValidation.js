export const validateAddress = (address) => {
  const errors = {};

  if (!address || typeof address !== "object") {
    return { general: "Address is required and must be an object" };
  }

  const requiredAddressFields = [
    "street",
    "city",
    "state",
    "country",
    "postal_code",
  ];
  requiredAddressFields.forEach((field) => {
    if (!address[field] || !address[field].trim()) {
      errors[field] = `${field.replace("_", " ")} is required`;
    }
  });

  if (address.house_number && typeof address.house_number !== "string") {
    errors.house_number = "House number must be a string";
  }

  return errors;
};

const validateSkills = (formData) => {
  const errors = {};
  const requiredFields = [
    "languages_know",
    "specializations",
    "designStyle",
    "softwareExpertise",
  ];
  requiredFields.forEach((field) => {
    if (!Array.isArray(formData[field]) || formData[field].length === 0) {
      errors[field] = `${field.replace("_", " ")} must have at least one item`;
    }
  });

  return errors;
};

const validateDesignerProfileData = (formData) => {
  const errors = {};

  const requiredFields = ["company", "position", "aboutMe"];
  requiredFields.forEach((field) => {
    if (!formData[field].trim()) {
      errors[field] = `${field.replace("_", " ")} is required`;
    }
  });

  if (
    !formData.experience ||
    isNaN(formData.experience) ||
    formData.experience <= 0
  ) {
    errors.experience = "Experience must be a positive number";
  }

  if (
    !formData.starting_price ||
    isNaN(formData.starting_price) ||
    formData.starting_price <= 0
  ) {
    errors.starting_price = "Starting price must be a positive number";
  }

  const skillErrors = validateSkills(formData);
  if (Object.keys(skillErrors).length > 0) {
    errors.skills = skillErrors;
  }

  // Using the separated address validation
  const addressErrors = validateAddress(formData.address);
  if (Object.keys(addressErrors).length > 0) {
    errors.address = addressErrors;
  }

  return errors;
};

export default validateDesignerProfileData;

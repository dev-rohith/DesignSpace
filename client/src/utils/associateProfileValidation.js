import { validateAddress } from "./DesingerProfileValidation";

  
  export const validateAssociateProfileData = (formData) => {
    let errors = {};
  
    const addressErrors = validateAddress(formData.address);
    if (Object.keys(addressErrors).length > 0) {
      errors.address = addressErrors;
    }
  
    if (!formData.bio.trim()) {
      errors.bio = "Bio is required.";
    } else if (formData.bio.length < 10) {
      errors.bio = "Bio must be at least 10 characters long.";
    }
  
    if (!Array.isArray(formData.skills) || formData.skills.length === 0) {
      errors.skills = "At least one skill is required.";
    }
  
    if (typeof formData.availability !== "boolean") {
      errors.availability = "Invalid availability value.";
    }
  
    return errors;
  };
  
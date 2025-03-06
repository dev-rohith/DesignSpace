export const loginValidation = (formData) => {
  const signupErrors = {};

  if (!formData.email) {
    signupErrors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    signupErrors.email = "Invalid email format";
  }
  if (!formData.password) {
    signupErrors.password = "Password is required";
  } else if (!/[0-9]/.test(formData.password)) {
    signupErrors.password = "Password must contain at least one number";
  }
  return signupErrors;
};

export const signupValidation = (formData) => {
  const loginErrors = {};

  if (!formData.firstName) {
    loginErrors.firstName = "First name is required";
  } else if (formData.firstName.length < 2) {
    loginErrors.firstName = "First name must be at least 2 characters";
  } else if (!/^[A-Za-z]+$/.test(formData.firstName)) {
    loginErrors.firstName = "First name must contain only letters";
  }

  if (!formData.lastName) {
    loginErrors.lastName = "Last name is required";
  } else if (formData.lastName.length < 2) {
    loginErrors.lastName = "Last name must be at least 2 characters";
  } else if (!/^[A-Za-z]+$/.test(formData.lastName)) {
    loginErrors.lastName = "Last name must contain only letters";
  }

  if (!formData.email) {
    loginErrors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    loginErrors.email = "Invalid email format";
  }

  if (!formData.password) {
    loginErrors.password = "Password is required";
  } else if (formData.password.length < 8) {
    loginErrors.password = "Password must be at least 8 characters long";
  } else if (!/[A-Z]/.test(formData.password)) {
    loginErrors.password =
      "Password must contain at least one uppercase letter";
  } else if (!/[a-z]/.test(formData.password)) {
    loginErrors.password =
      "Password must contain at least one lowercase letter";
  } else if (!/[0-9]/.test(formData.password)) {
    loginErrors.password = "Password must contain at least one number";
  } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
    loginErrors.password =
      "Password must contain at least one special character";
  }

  if (!formData.confirmPassword) {
    loginErrors.confirmPassword = "Confirm password is required";
  } else if (formData.confirmPassword !== formData.password) {
    loginErrors.confirmPassword = "Passwords do not match";
  }

  return loginErrors;
};

const validateAddress = (address) => {
  const addressErrors = {};
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
      addressErrors[field] = `${field.replace("_", " ")} is required`;
    }
  });
  if (address.house_number && typeof address.house_number !== "string") {
    addressErrors.house_number = "House number must be a string";
  }
  return addressErrors;
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

export const designerProfileDataValidation = (formData) => {
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

  const addressErrors = validateAddress(formData.address);
  if (Object.keys(addressErrors).length > 0) {
    errors.address = addressErrors;
  }

  return errors;
};

export const associateProfileDataValidation = (formData) => {
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

export const createProjectDataValidation = (formData) => {
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
};

export const TaskFormValidation = (formData) => {
  const errors = {};

  if (!formData.name.trim()) errors.name = "Task name is required";
  if (!formData.description.trim())
    errors.description = "Description is required";
  if (!formData.startDate) errors.startDate = "Start date is required";
  if (!formData.dueDate) errors.dueDate = "Due date is required";

  if (formData.startDate && formData.dueDate) {
    const start = new Date(formData.startDate);
    const due = new Date(formData.dueDate);
    if (due < start) {
      errors.dueDate = "Due date cannot be before start date";
    }
  }

  const addressErrors = validateAddress(formData.address);
  if (Object.keys(addressErrors).length > 0) {
    errors.address = addressErrors;
  }

  return errors;
};

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

export const passwordResetValidation = (formData) => {
  const error = {};
  if (formData.password !== formData.confirmPassword) {
    error.password = "password and confirm password are not same";
  } else if (password.length < 8) {
    error.password = "Password must be at least 8 characters long";
  } else if (!/[A-Z]/.test(formData.password)) {
    error.password = "Password must contain at least one uppercase letter";
  } else if (!/[a-z]/.test(formData.password)) {
    error.password = "Password must contain at least one lowercase letter";
  } else if (!/[0-9]/.test(formData.password)) {
    error.password = "Password must contain at least one number";
  }
  return error;
};

export const validatePendigProjectUpdate = (formData) => {
  const errors = {};
  if (!formData.title.trim()) errors.title = "Title is required";
  if (!formData.description.trim())
    errors.description = "Description is required";
  if (!formData.minimumDays) {
    errors.minimumDays = "Minimum days is required";
  } else if (isNaN(formData.minimumDays) || formData.minimumDays <= 0) {
    errors.minimumDays = "Minimum days must be a positive number";
  }
  if (!formData.budget) errors.budget = "Budget is required";
  const addressErrors = validateAddress(formData.address);
  if (Object.keys(addressErrors).length > 0) {
    errors.address = addressErrors;
  }

  return errors;
};

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



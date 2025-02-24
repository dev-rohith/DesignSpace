export const TaskFormValidation = (formData) => {
    const errors = {};

    if (!formData.name.trim()) errors.name = "Task name is required";
    if (!formData.startDate) errors.startDate = "Start date is required";
    if (!formData.dueDate) errors.dueDate = "Due date is required";

    if (!formData.address.street?.trim())
      errors.street = "Street is required";
    if (!formData.address.city?.trim()) errors.city = "City is required";
    if (!formData.address.state?.trim()) errors.state = "State is required";
    if (!formData.address.country?.trim())
      errors.country = "Country is required";
    if (!formData.address.postal_code?.trim())
      errors.postal_code = "Postal code is required";

    if (formData.startDate && formData.dueDate) {
      const start = new Date(formData.startDate);
      const due = new Date(formData.dueDate);
      if (due < start) {
        errors.dueDate = "Due date cannot be before start date";
      }
    }

    return errors
  };


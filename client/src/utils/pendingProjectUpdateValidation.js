import { validateAddress } from "./DesingerProfileValidation"


const validatePendigProjectUpdate = (formData) => {
    const errors = {}
    if(!formData.title.trim()) errors.title = "Title is required"
    if(!formData.description.trim()) errors.description = "Description is required"
    if(!formData.minimumDays){
        errors.minimumDays = "Minimum days is required"
    }else if(isNaN(formData.minimumDays) || formData.minimumDays <= 0){
        errors.minimumDays = "Minimum days must be a positive number"
    }
    if(!formData.budget) errors.budget = "Budget is required"
    const addressErrors = validateAddress(formData.address);
      if (Object.keys(addressErrors).length > 0) {
        errors.address = addressErrors;
      }
    
    return errors
}

export default validatePendigProjectUpdate
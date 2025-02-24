export const passwordResetValidation = (formData) => {
    const error = {};
    if (formData.password !== formData.confirmPassword) {
        error.password = "password and confirm password are not same";
    }else if(password.length < 8){
        error.password = "Password must be at least 8 characters long";
    }else if(!/[A-Z]/.test(formData.password)){
        error.password = "Password must contain at least one uppercase letter";
    }else if(!/[a-z]/.test(formData.password)){
        error.password = "Password must contain at least one lowercase letter";
    }else if(!/[0-9]/.test(formData.password)){
        error.password = "Password must contain at least one number";
    }
    return error;
};
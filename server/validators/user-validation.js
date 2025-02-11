import joi from "joi";

const userPasswordValidator = joi.object({
    currentPassword: joi.string().required(),
    newPassword: joi
    .string()
    .min(6)
    .max(30)
    .required()
    .pattern(
      new RegExp("^(?=.*[A-Z])(?=.*[@#$%^&*!])[a-zA-Z0-9@#$%^&*!]{6,30}$")
    ).messages({
        "string.pattern.base":
          "Password must be 6-30 characters long, include at least one uppercase letter and one special character.",
      }),
});



export {userPasswordValidator, }

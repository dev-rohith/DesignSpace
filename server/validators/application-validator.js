import joi from 'joi'

export const applicationValidator = joi.object({
    requestId: joi.string().required(),
    requestedRole: joi.string().required(),
    }).options({ abortEarly: false });

export const updateApplicationValidator = joi.object({
    status: joi.string().valid('approved', 'rejected').required(),
    }).options({ abortEarly: false });

export const applicationIdValidator = joi.object({
    id: joi.string().required(),
    }).options({ abortEarly: false });


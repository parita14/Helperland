import { Joi } from "celebrate";

export const SettingsSchema = {
    detailsAdd: {
        body: Joi.object({
            FirstName: Joi.string(),
            LastName: Joi.string(),
            Mobile: Joi.number().integer().min(1000000000).max(9999999999),
            DateOfBirth: Joi.date().max(Date.now()),
            LanguageId: Joi.number(),
        })
    },

    createAddress: {
        body: Joi.object({
            AddressLine1: Joi.string().required(),
            AddressLine2: Joi.string(),
            City: Joi.string().required(),
            State: Joi.string(),
            PostalCode: Joi.number().integer().required().min(100000).max(999999),
            Mobile: Joi.number().integer().required().min(1000000000).max(9999999999),
        })
    },

    addressAdd: {
        body: Joi.object({
            AddressLine1: Joi.string(),
            AddressLine2: Joi.string(),
            City: Joi.string(),
            State: Joi.string(),
            Mobile: Joi.number().integer().min(1000000000).max(9999999999),
        })
    },

    passwordAdd: {
        body: Joi.object({
            OldPassword: Joi.string().required(),
            NewPassword: Joi.string().required(),
            ConfirmPassword: Joi.string().required()
        })
    }

}


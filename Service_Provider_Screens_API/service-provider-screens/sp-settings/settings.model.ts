import { Joi } from "celebrate";

export const SettingsSchema = {
    detailsAdd: {
        body: Joi.object({
            FirstName: Joi.string(),
            LastName: Joi.string(),
            Mobile: Joi.number().integer().min(1000000000).max(9999999999),
            DateOfBirth: Joi.date().max(Date.now()),
            NationalityId: Joi.number(),
            Gender: Joi.number(),
            UserProfilePicture: Joi.number(),
            AddressLine1: Joi.string(),
            AddressLine2: Joi.string(),
            PostalCode: Joi.number().integer().min(100000).max(999999),
            City: Joi.string()
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


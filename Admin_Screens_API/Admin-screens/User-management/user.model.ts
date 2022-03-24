import { Joi } from "celebrate";

export const UserSchema = {
    userAdd: {
        body: Joi.object({
            UserName: Joi.string(),

            UserType: Joi.string(),

            Phone: Joi.string(),

            PostalCode: Joi.number().integer().min(100000).max(999999),

            Email: Joi.string().email(),

            FromDate: Joi.string(),

            ToDate: Joi.string(),
        })
    },
    
    activateAdd: {
        body: Joi.object({
            Email: Joi.string().email(),
        })
    }
}


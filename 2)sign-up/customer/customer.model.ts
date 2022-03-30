import { Joi } from "celebrate";

const params: object = {
    UserId: Joi.number().integer().required()
};

export const CustomerSchema = {
    get: {
        params: params
    },
    custAdd: {
        body: Joi.object({
            FirstName: Joi.string().required(),
            
            LastName: Joi.string().required(),
            
            Email: Joi.string().required().email(),
            
            Password: Joi.string().required(),
            
            ConfirmPassword: Joi.string().required(),
            
            Mobile: Joi.number().integer().required().min(1000000000).max(9999999999)
        })
    },
    activateAdd: {
        body: Joi.object({
            Email: Joi.string().required().email()
        })
    }
};
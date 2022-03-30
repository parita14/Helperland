import {Joi} from "celebrate"

export const PasswordSchema = {
    forgotAdd: {
        body: Joi.object({
            Email: Joi.string().required().email()
        })
    },
    resetAdd: {
        body: Joi.object({
            NewPassword: Joi.string().required(),
            
            ConfirmPassword: Joi.string().required()
        })
    }
}
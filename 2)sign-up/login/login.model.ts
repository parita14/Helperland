import {Joi} from "celebrate"

export const LogInSchema = {
    loginAdd: {
        body: Joi.object({
            Email: Joi.string().required().email(),
            
            Password: Joi.string().required(),
        })
    }
}
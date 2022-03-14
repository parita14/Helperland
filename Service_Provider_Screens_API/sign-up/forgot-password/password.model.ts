import {Joi} from "celebrate"

export const PasswordSchema = {
    forgotAdd: {
        body: Joi.object({
            Email: Joi.string()
                      .required()
                      .email()
                      .example('solankiparita7@gmail.com')
                      .description('Email of the user')
        })
    },
    resetAdd: {
        body: Joi.object({
            NewPassword: Joi.string()
                            .required()
                            .example('pari123')
                            .description('Password of the user'),
            ConfirmPassword: Joi.string()
                                .required()
                                .example('pari123')
                                .description('Password of the user')
        })
    }
}
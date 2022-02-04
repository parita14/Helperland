import { Joi } from "celebrate";

const params: object = {
    UserId: Joi.number()
             .integer()
             .required()
             .description('Id of user')
};

export const SPSchema = {
    get: {
        params: params
    },
    add: {
        body: Joi.object({
            FirstName: Joi.string()
                        .required()
                        .example('Parita')
                        .description('First name of the service provider'),
            LastName: Joi.string()
                       .required()
                       .example('Solanki')
                       .description('Last name of the service provider'),
            Email: Joi.string()
                    .required()
                    .email()
                    .example('solankiparita7@gmail.com')
                    .description('Email of the service provider'),
            Password: Joi.string()
                      .required()
                      .example('pari123')
                      .description('Password of the service provider'),
            Mobile: Joi.string()
                      .required()
                      .example('9988776655')
                      .description('Mobile number of the service provider')
        })
    }
};
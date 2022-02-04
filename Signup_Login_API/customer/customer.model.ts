import { Joi } from "celebrate";

const params: object = {
    UserId: Joi.number()
             .integer()
             .required()
             .description('Id of Customer')
};

export const CustomerSchema = {
    get: {
        params: params
    },
    add: {
        body: Joi.object({
            FirstName: Joi.string()
                        .required()
                        .example('Parita')
                        .description('First name of the customer'),
            LastName: Joi.string()
                       .required()
                       .example('Solanki')
                       .description('Last name of the customer'),
            Email: Joi.string()
                    .required()
                    .email()
                    .example('solankiparita7@gmail.com')
                    .description('Email of the customer'),
            Password: Joi.string()
                      .required()
                      .example('pari123')
                      .description('Password of the customer'),
            Mobile: Joi.string()
                      .required()
                      .example('9988776655')
                      .description('Mobile number of the customer')
        })
    }
};
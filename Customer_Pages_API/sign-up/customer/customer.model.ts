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
    custAdd: {
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
            ConfirmPassword: Joi.string()
                                .required()
                                .example('pari123')
                                .description('Confirm Password of the customer'),
            Mobile: Joi.number()
                       .integer()
                       .required()
                       .min(1000000000).max(9999999999)
                       .example('9988776655')
                       .description('Mobile number of the customer'),
            ZipCode: Joi.number()
                        .integer()
                        .required()
                        .min(100000).max(999999)
                        .example(123456)
                        .description('ZipCode of the customer')
        })
    },
    activateAdd: {
        body: Joi.object({
            Email: Joi.string()
                      .required()
                      .email()
                      .example('solankiparita7@gmail.com')
                      .description('Email of the customer')
        })
    }
};
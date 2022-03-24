import { Joi } from 'celebrate';

const params: object = {
    ContactUsId: Joi.number()
                  .integer()
                  .required()
                  .description('Id of user')
};

export const ContactsSchema = {
    get: {
        params: params
    },
    contactsAdd: {
        body: Joi.object({
            FirstName: Joi.string()
                   .required()
                   .example('Parita')
                   .description('FirstName of user'),
            LastName: Joi.string()
                   .required()
                   .example('Solanki')
                   .description('LastName of user'),
            Email: Joi.string()
                    .required()
                    .email()
                    .example('abc@gmail.com')
                    .description('email of user'),
            Subject: Joi.string()
                          .required()
                          .example('General')
                          .description('Subject type'),
            PhoneNumber: Joi.number()
                          .required()
                          .min(1000000000).max(9999999999)
                          .example(9979882234)
                          .description('Phone number of user'),
            Message: Joi.string()
                      .required()
                      .example('having issues in booking service')
                      .description('Message')
        })
    }
};
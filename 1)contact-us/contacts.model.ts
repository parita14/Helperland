import { Joi } from 'celebrate';

const params: object = {
    ContactUsId: Joi.number().integer().required()
};

export const ContactsSchema = {
    get: {
        params: params
    },
    contactsAdd: {
        body: Joi.object({
            FirstName: Joi.string().required(),

            LastName: Joi.string().required(),

            Email: Joi.string().required().email(),

            Subject: Joi.string().required(),

            PhoneNumber: Joi.number().required().min(1000000000).max(9999999999),

            Message: Joi.string().required()
        })
    }
};
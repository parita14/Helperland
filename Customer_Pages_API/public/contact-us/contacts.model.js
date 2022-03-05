"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsSchema = void 0;
var celebrate_1 = require("celebrate");
var params = {
    ContactUsId: celebrate_1.Joi.number()
        .integer()
        .required()
        .description('Id of user')
};
exports.ContactsSchema = {
    get: {
        params: params
    },
    contactsAdd: {
        body: celebrate_1.Joi.object({
            Name: celebrate_1.Joi.string()
                .required()
                .example('Parita')
                .description('Name of user'),
            Email: celebrate_1.Joi.string()
                .required()
                .email()
                .example('abc@gmail.com')
                .description('email of user'),
            SubjectType: celebrate_1.Joi.string()
                .required()
                .example('General')
                .description('Subject type'),
            PhoneNumber: celebrate_1.Joi.number()
                .required()
                .min(1000000000).max(9999999999)
                .example(9979882234)
                .description('Phone number of user'),
            Message: celebrate_1.Joi.string()
                .required()
                .example('having issues in booking service')
                .description('Message')
        })
    }
};

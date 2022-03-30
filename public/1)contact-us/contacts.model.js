"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsSchema = void 0;
var celebrate_1 = require("celebrate");
var params = {
    ContactUsId: celebrate_1.Joi.number().integer().required()
};
exports.ContactsSchema = {
    get: {
        params: params
    },
    contactsAdd: {
        body: celebrate_1.Joi.object({
            FirstName: celebrate_1.Joi.string().required(),
            LastName: celebrate_1.Joi.string().required(),
            Email: celebrate_1.Joi.string().required().email(),
            Subject: celebrate_1.Joi.string().required(),
            PhoneNumber: celebrate_1.Joi.number().required().min(1000000000).max(9999999999),
            Message: celebrate_1.Joi.string().required()
        })
    }
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerSchema = void 0;
var celebrate_1 = require("celebrate");
var params = {
    UserId: celebrate_1.Joi.number()
        .integer()
        .required()
        .description('Id of Customer')
};
exports.CustomerSchema = {
    get: {
        params: params
    },
    add: {
        body: celebrate_1.Joi.object({
            FirstName: celebrate_1.Joi.string()
                .required()
                .example('Parita')
                .description('First name of the customer'),
            LastName: celebrate_1.Joi.string()
                .required()
                .example('Solanki')
                .description('Last name of the customer'),
            Email: celebrate_1.Joi.string()
                .required()
                .email()
                .example('solankiparita7@gmail.com')
                .description('Email of the customer'),
            Password: celebrate_1.Joi.string()
                .required()
                .example('pari123')
                .description('Password of the customer'),
            Mobile: celebrate_1.Joi.string()
                .required()
                .example('9988776655')
                .description('Mobile number of the customer')
        })
    }
};

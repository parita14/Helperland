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
    custAdd: {
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
            ConfirmPassword: celebrate_1.Joi.string()
                .required()
                .example('pari123')
                .description('Confirm Password of the customer'),
            Mobile: celebrate_1.Joi.number()
                .integer()
                .required()
                .min(1000000000).max(9999999999)
                .example('9988776655')
                .description('Mobile number of the customer'),
            ZipCode: celebrate_1.Joi.number()
                .integer()
                .required()
                .min(100000).max(999999)
                .example(123456)
                .description('ZipCode of the customer')
        })
    },
    activateAdd: {
        body: celebrate_1.Joi.object({
            Email: celebrate_1.Joi.string()
                .required()
                .email()
                .example('solankiparita7@gmail.com')
                .description('Email of the customer')
        })
    }
};

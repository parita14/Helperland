"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordSchema = void 0;
var celebrate_1 = require("celebrate");
exports.PasswordSchema = {
    forgotAdd: {
        body: celebrate_1.Joi.object({
            Email: celebrate_1.Joi.string()
                .required()
                .email()
                .example('solankiparita7@gmail.com')
                .description('Email of the user')
        })
    },
    resetAdd: {
        body: celebrate_1.Joi.object({
            NewPassword: celebrate_1.Joi.string()
                .required()
                .example('pari123')
                .description('Password of the user'),
            ConfirmPassword: celebrate_1.Joi.string()
                .required()
                .example('pari123')
                .description('Password of the user')
        })
    }
};

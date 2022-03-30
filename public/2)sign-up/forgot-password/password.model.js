"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordSchema = void 0;
var celebrate_1 = require("celebrate");
exports.PasswordSchema = {
    forgotAdd: {
        body: celebrate_1.Joi.object({
            Email: celebrate_1.Joi.string().required().email()
        })
    },
    resetAdd: {
        body: celebrate_1.Joi.object({
            NewPassword: celebrate_1.Joi.string().required(),
            ConfirmPassword: celebrate_1.Joi.string().required()
        })
    }
};

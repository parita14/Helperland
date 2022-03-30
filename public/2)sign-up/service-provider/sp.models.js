"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SPSchema = void 0;
var celebrate_1 = require("celebrate");
var params = {
    UserId: celebrate_1.Joi.number().integer().required()
};
exports.SPSchema = {
    get: {
        params: params
    },
    spAdd: {
        body: celebrate_1.Joi.object({
            FirstName: celebrate_1.Joi.string().required(),
            LastName: celebrate_1.Joi.string().required(),
            Email: celebrate_1.Joi.string().required().email(),
            Password: celebrate_1.Joi.string().required(),
            ConfirmPassword: celebrate_1.Joi.string().required(),
            Mobile: celebrate_1.Joi.number().integer().required().min(1000000000).max(9999999999)
        })
    },
    activateAdd: {
        body: celebrate_1.Joi.object({
            Email: celebrate_1.Joi.string().required().email()
        })
    }
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
var celebrate_1 = require("celebrate");
exports.UserSchema = {
    userAdd: {
        body: celebrate_1.Joi.object({
            UserName: celebrate_1.Joi.string(),
            UserType: celebrate_1.Joi.string(),
            Phone: celebrate_1.Joi.string(),
            PostalCode: celebrate_1.Joi.number().integer().min(100000).max(999999),
            Email: celebrate_1.Joi.string().email(),
            FromDate: celebrate_1.Joi.string(),
            ToDate: celebrate_1.Joi.string(),
        })
    },
    activateAdd: {
        body: celebrate_1.Joi.object({
            Email: celebrate_1.Joi.string().email(),
        })
    }
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsSchema = void 0;
var celebrate_1 = require("celebrate");
exports.SettingsSchema = {
    detailsAdd: {
        body: celebrate_1.Joi.object({
            FirstName: celebrate_1.Joi.string(),
            LastName: celebrate_1.Joi.string(),
            Mobile: celebrate_1.Joi.number().integer().min(1000000000).max(9999999999),
            DateOfBirth: celebrate_1.Joi.date().max(Date.now()),
            NationalityId: celebrate_1.Joi.number(),
            Gender: celebrate_1.Joi.number(),
            UserProfilePicture: celebrate_1.Joi.number(),
            AddressLine1: celebrate_1.Joi.string(),
            AddressLine2: celebrate_1.Joi.string(),
            PostalCode: celebrate_1.Joi.number().integer().min(100000).max(999999),
            City: celebrate_1.Joi.string()
        })
    },
    passwordAdd: {
        body: celebrate_1.Joi.object({
            OldPassword: celebrate_1.Joi.string().required(),
            NewPassword: celebrate_1.Joi.string().required(),
            ConfirmPassword: celebrate_1.Joi.string().required()
        })
    }
};

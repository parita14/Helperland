"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRequestSchema = void 0;
var celebrate_1 = require("celebrate");
exports.ServiceRequestSchema = {
    serviceAdd: {
        body: celebrate_1.Joi.object({
            ServiceStartDate: celebrate_1.Joi.date().greater(Date.now()).required(),
            ServiceStartTime: celebrate_1.Joi.string().valid("8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00").required(),
            ServiceHours: celebrate_1.Joi.number().valid(3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12).required(),
            Comments: celebrate_1.Joi.string(),
            ServiceProviderId: celebrate_1.Joi.number().integer(),
            HasPets: celebrate_1.Joi.boolean().required(),
            ServiceRequestAddress: celebrate_1.Joi.object().keys({
                AddressLine1: celebrate_1.Joi.string().required(),
                AddressLine2: celebrate_1.Joi.string(),
                City: celebrate_1.Joi.string().required(),
                State: celebrate_1.Joi.string(),
                Mobile: celebrate_1.Joi.number().integer().required().min(1000000000).max(9999999999),
            }),
            ExtraService: celebrate_1.Joi.array()
        })
    }
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceSchema = void 0;
var celebrate_1 = require("celebrate");
exports.ServiceSchema = {
    zipAdd: {
        body: celebrate_1.Joi.object({
            ZipCode: celebrate_1.Joi.number()
                .integer()
                .required()
                .min(100000).max(999999)
                .example(380021)
                .description('ZipCode of the customer')
        })
    }
};

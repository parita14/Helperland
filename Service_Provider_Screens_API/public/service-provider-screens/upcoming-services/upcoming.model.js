"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpcomingSchema = void 0;
var celebrate_1 = require("celebrate");
exports.UpcomingSchema = {
    cancleAdd: {
        body: celebrate_1.Joi.object({
            Reason: celebrate_1.Joi.string().required(),
        })
    },
};

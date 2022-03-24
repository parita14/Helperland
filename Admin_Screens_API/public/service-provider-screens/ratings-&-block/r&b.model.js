"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rAndbSchema = void 0;
var celebrate_1 = require("celebrate");
exports.rAndbSchema = {
    blockAdd: {
        body: celebrate_1.Joi.object({
            IsBlocked: celebrate_1.Joi.boolean().required()
        })
    },
};

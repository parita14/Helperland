"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavSchema = void 0;
var celebrate_1 = require("celebrate");
exports.FavSchema = {
    favAdd: {
        body: celebrate_1.Joi.object({
            IsFavorite: celebrate_1.Joi.boolean().required()
        })
    },
    blockAdd: {
        body: celebrate_1.Joi.object({
            IsBlocked: celebrate_1.Joi.boolean().required()
        })
    },
};

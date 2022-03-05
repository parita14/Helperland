"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistorySchema = void 0;
var celebrate_1 = require("celebrate");
exports.HistorySchema = {
    ratingAdd: {
        body: celebrate_1.Joi.object({
            OnTimeArrival: celebrate_1.Joi.number().min(0).max(5).required(),
            Friendly: celebrate_1.Joi.number().min(0).max(5).required(),
            QualityOfService: celebrate_1.Joi.number().min(0).max(5).required(),
            Comments: celebrate_1.Joi.string(),
        })
    }
};

import { Joi } from "celebrate";

export const HistorySchema = {
    ratingAdd: {
        body: Joi.object({
            OnTimeArrival: Joi.number().precision(1).min(0).max(5).required(),
            Friendly: Joi.number().precision(1).min(0).max(5).required(),
            QualityOfService: Joi.number().precision(1).min(0).max(5).required(),
            Comments: Joi.string(),
        })
    }

}


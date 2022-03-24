import { Joi } from "celebrate";

export const UpcomingSchema = {
    cancleAdd: {
        body: Joi.object({
            Reason: Joi.string().required(),
        })
    },
}


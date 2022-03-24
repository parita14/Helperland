import { Joi } from "celebrate";

export const rAndbSchema = {
    blockAdd: {
        body: Joi.object({
            IsBlocked: Joi.boolean().required()
        })
    },
}


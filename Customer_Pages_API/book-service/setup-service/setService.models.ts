import { Joi } from "celebrate";

export const ServiceSchema = {
    zipAdd: {
        body: Joi.object({
            ZipCode: Joi.number()
                        .integer()
                        .required()
                        .min(100000).max(999999)
                        .example(380021)
                        .description('ZipCode of the customer')
        })
    }
};
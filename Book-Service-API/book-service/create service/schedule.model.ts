import { Joi } from "celebrate";

export const ServiceRequestSchema = {
    serviceAdd: {
        body: Joi.object({
            ServiceId: Joi.number(),

            ServiceStartDate: Joi.date()
            .greater(Date.now())
            .required(),
            
            ServiceStartTime: Joi.string().required(),

            ServiceHours: Joi.number().required(),
    
            ExtraHours: Joi.number(),

            Comments: Joi.string(),

            HasPets: Joi.boolean().required(), 

            ServiceRequestAddress: Joi.object().keys({
                AddressLine1: Joi.string().required(),

                AddressLine2: Joi.string(),

                City: Joi.string().required(),
                         
                State: Joi.string(),

                PostalCode: Joi.number().integer().required().min(100000).max(999999),
                          
                Mobile: Joi.number().integer().required().min(1000000000).max(9999999999),        
            }),

            ExtraService: Joi.object().keys({
                ServiceExtraId: Joi.number()
            }) 
        })
       
    }
}


import { Joi } from "celebrate";

export const ServiceRequestSchema = {
    serviceAdd: {
        body: Joi.object({
            ServiceStartDate: Joi.date().greater(Date.now()).required(),
        
            ServiceStartTime: Joi.string().valid("8:00", "8:30","9:00", "9:30","10:00", "10:30","11:00", "11:30","12:00", "12:30","13:00", "13:30","14:00", "14:30","15:00", "15:30","16:00", "16:30","17:00", "17:30","18:00").required(),

            ServiceHours: Joi.number().valid(3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12).required(),

            Comments: Joi.string(),

            ServiceProviderId: Joi.number().integer(),

            HasPets: Joi.boolean().required(), 

            ServiceRequestAddress: Joi.object().keys({
                AddressLine1: Joi.string().required(),

                AddressLine2: Joi.string(),

                City: Joi.string().required(),
                         
                State: Joi.string(),
                          
                Mobile: Joi.number().integer().required().min(1000000000).max(9999999999),        
            }),

            ExtraService: Joi.array() 
        })
       
    }
}


import Joi from 'joi';

export function validateCurrencyRequest(request){
    let errors = [];
    const requestObject = JSON.parse(request);
    const schema = Joi.object({
        to: Joi.string().required().min(3).max(3),
        from: Joi.string().required().min(3).max(3),
        amount: Joi.number().required(),
    });
    const { error } = schema.validate(requestObject);
    
    if (error !== undefined && error.details.length > 0) {
        errors = error.details.map(data => data.message);
    }
    
    return errors;
}
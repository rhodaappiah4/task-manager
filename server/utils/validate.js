// Import Joi for data validation
import Joi from "joi";

// Function to validate task data
export const validateTask = (task) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(255).required(),
        description: Joi.string().allow('').optional(),
        status: Joi.string().valid('pending', 'in-progress', 'completed').required()
    });
    return schema.validate(task);
}
import Joi from 'joi';
import JoiObjectId from 'joi-objectid';

Joi.objectId = JoiObjectId(Joi);

export const createContactsSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Username should have at least 3 characters',
    'string.max': 'Username should have at most 20 characters',
    'any.required': 'Username is required',
    }),
    phoneNumber: Joi.string().required().pattern(/^\+(\d{1,4})\d{4,10}$/).messages({
        'string.empty': 'Phone number cannot be empty',
        'string.pattern.base': 'Phone number must begin with +(country code)(number)',
        'any.required': 'Phone number is required',
    }),
    email: Joi.string().email().optional(),
    isFavourite: Joi.boolean().required().messages({
    'any.required': 'isFavourite is required',
    }),
    contactType: Joi.string().valid('work', 'home', 'personal').required().messages({
        'any.only': 'Contact type must be one of work, home, personal',
        'any.required': 'Contact type must be required'
    }),
    userId: Joi.objectId().optional().messages({
    'string.pattern.base': 'Parent ID must be a valid ObjectId',
  }),
});

export const updateContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20),
    phoneNumber: Joi.string().pattern(/^\+(\d{1,4})\d{4,10}$/).messages({
        'string.empty': 'Phone number cannot be empty',
        'string.pattern.base': 'Phone number must begin with +(country code)(number)',
    }),
    email: Joi.string().email().optional(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal').messages({
        'any.only': 'Contact type must be one of work, home, personal',
    }),
    userId: Joi.objectId().optional().messages({
    'string.pattern.base': 'Parent ID must be a valid ObjectId',
  }),
});

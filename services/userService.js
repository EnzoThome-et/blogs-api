const Joi = require('joi');
const { User } = require('../models');

const schema = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    image: Joi.string().required(),
});

const response = (status, message) => ({
    status,
    message,
  });

const create = async ({ displayName, email, password, image }) => {
    const { error } = schema.validate({ displayName, email, password, image });

    const passwordMessage = '"password" length must be at least 6 characters long';

    if (error) {
        const result = response(400, error.message);
        if (result.message === passwordMessage) {
            result.message = '"password" length must be 6 characters long';
            return result;
        }
        return result;
    }

    const userExistance = await User.findOne({ where: { email } });

    if (userExistance) {
        const result = response(409, 'User already registered');
        return result;
      }

    const user = await User.create({ displayName, email, password, image });

    return user;
};

module.exports = { create };
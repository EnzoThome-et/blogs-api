const Joi = require('joi');
// const { User } = require('../models');

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

    if (error) {
        throw response(400, error.message);
    }

    // const userExistance = await User.findOne({ where: { email } });

    // if (userExistance) {
    //     throw response(409, 'User already registered');
    //   }

    // const user = await User.create({ displayName, email, password, image });

    // return user;
};

module.exports = { create };
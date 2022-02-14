const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const userSchema = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    image: Joi.string().required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const response = (status, message) => ({
    status,
    message,
  });

  const passwordMessage = '"password" length must be at least 6 characters long';

const create = async ({ displayName, email, password, image }) => {
    const { error } = userSchema.validate({ displayName, email, password, image });

    if (error) {
        const result = response(400, error.message);
        if (result.message === passwordMessage) {
            result.message = '"password" length must be 6 characters long';
            return result;
        }
        return result;
    }

    const userExistance = await User.findOne({ where: { email } });

    if (userExistance) return response(409, 'User already registered');

    const user = await User.create({ displayName, email, password, image });

    return user;
};

const login = async ({ email, password }) => {
    const { error } = loginSchema.validate({ email, password });

   if (error) return response(400, error.message);

   const user = await User.findOne({ where: { email } });
   console.log(user);

   if (user == null) return response(400, 'Invalid fields');

   const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, jwtConfig);
  return { token };
};

module.exports = { create, login };
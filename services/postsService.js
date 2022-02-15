const Joi = require('joi');
const { Op } = require('sequelize');
const { BlogPosts, Categories, User } = require('../models');

// Consultei o repo do Michael no desenvolvimento da função create ref: https://github.com/tryber/sd-014-b-project-blogs-api/pull/2/commits/aaf9bcb5098ba8834bca0a0d69c2069cde6b095f

const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
});

const response = (status, message) => ({
    status,
    message,
});

const create = async ({ user, title, content, categoryIds }) => {
    const { error } = schema.validate({ title, content, categoryIds });

    if (error) return response(400, error.message);

    const post = await BlogPosts.create({ userId: user.id, title, content });

    const checkCategory = await Categories.findAll({
        where: { id: { [Op.or]: categoryIds } },
      });
  
      if (!checkCategory.length) {
        return response(400, '"categoryIds" not found');
      }

    return { id: post.id, userId: user.id, title, content };
};

const getAll = async () => {
    const allPosts = await BlogPosts.findAll({
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Categories, as: 'Categories' },
        ],
    });
    return allPosts;
};

module.exports = { create, getAll };
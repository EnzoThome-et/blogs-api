const { Categories } = require('../models');

const create = async (name) => {
    const newCategory = await Categories.create({ name });
    return newCategory;
};

const getAll = async () => {
    const categories = await Categories.findAll({ attributes: ['id', 'name'] });
    return categories;
};

module.exports = { create, getAll };
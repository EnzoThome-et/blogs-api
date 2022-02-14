const { Categories } = require('../models');

const create = async (name) => {
    const newCategory = await Categories.create({ name });
    return newCategory;
};

module.exports = { create };
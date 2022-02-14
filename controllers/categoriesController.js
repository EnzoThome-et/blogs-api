const categoriesServices = require('../services/categoriesService');

const create = async (req, res) => {
    const { name } = req.body;
    if (!name || name === undefined) return res.status(400).json({ message: '"name" is required' });
    try {
        const newCategory = await categoriesServices.create(name);
        return res.status(201).json(newCategory);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { create };
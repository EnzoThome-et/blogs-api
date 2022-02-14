const userService = require('../services/userService');

const create = async (req, res) => {
    try {
        const createUser = await userService.create(req.body);
        return res.status(201).json(createUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = create;
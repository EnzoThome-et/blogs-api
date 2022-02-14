const userService = require('../services/userService');

const create = async (req, res) => {
    try {
        const createUser = await userService.create(req.body);
        if (createUser.status >= 400) {
            return res.status(createUser.status).json({ message: createUser.message });
        }
        return res.status(201).json(createUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const createUser = await userService.login(req.body);
        if (createUser.status >= 400) {
            return res.status(createUser.status).json({ message: createUser.message });
        }
        return res.status(200).json(createUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const users = await userService.getAll();
        if (users.status >= 400) {
            return res.status(users.status).json({ message: users.message });
        }
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { create, login, getAll };
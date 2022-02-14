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

const getAll = async (_req, res) => {
    try {
        const users = await userService.getAll();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userService.getById(id);
        if (user.status >= 400) {
            return res.status(user.status).json({ message: user.message });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { create, login, getAll, getById };
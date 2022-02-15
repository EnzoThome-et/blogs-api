const postsService = require('../services/postsService');

const create = async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const { user } = req;

    try {
        const newPost = await postsService.create({ user, title, content, categoryIds });
        if (newPost.status >= 400) {
            return res.status(newPost.status).json({ message: newPost.message });
        }
        return res.status(201).json(newPost);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAll = async (_req, res) => {
    try {
        const allPosts = await postsService.getAll();
        return res.status(200).json(allPosts);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { create, getAll };
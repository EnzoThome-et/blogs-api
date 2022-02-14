const jwt = require('jsonwebtoken');
const { User } = require('../../models');

// Consultei o repo do Luiz Gustavo nessa função ref: https://github.com/tryber/sd-014-b-project-blogs-api/pull/20/commits/a61aa5593253fb7810ead3c0283394f612d9c87c

const verifyToken = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    try {
        const decoded = jwt.verify(authorization, process.env.JWT_SECRET);

        const user = await User.findByPk(decoded.data.id);

        if (!user) {
            return res.status(401).json({ message: 'Expired or invalid token' });
          }
      
          req.user = user;
      
          next();
    } catch (error) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
};

module.exports = {
    verifyToken,
  };

module.exports = (sequelize, _DataTypes) => {
 const PostsCategories = sequelize.define('PostsCategories', {}, {});

  PostsCategories.associate = (models) => {
    models.BlogPosts.belongsToMany(models.BlogPosts, {
      as: 'BlogPosts',
      through: PostsCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Categories.belongsToMany(models.Categories, {
      as: 'Categories',
      through: PostsCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
  return PostsCategories;
};
module.exports = (sequelize, _DataTypes) => {
 const PostsCategories = sequelize.define('PostsCategories', {}, { timestamps: false });

  PostsCategories.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Categories, {
      as: 'categories',
      through: PostsCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.Categories.belongsToMany(models.BlogPosts, {
      as: 'BlogPosts',
      through: PostsCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };
  return PostsCategories;
};
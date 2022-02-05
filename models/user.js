const User = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    underscored: true,
  });
  return UserTable;
};

module.exports = User;
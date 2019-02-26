'use strict';

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      firstName: { allowNul: false, type: DataTypes.STRING, field: 'first_name' },
      lastName: { allowNul: false, type: DataTypes.STRING, field: 'last_name' },
      email: {
        allowNul: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: { allowNul: false, type: DataTypes.STRING },
      isAdmin: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      underscored: true
    }
  );
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};

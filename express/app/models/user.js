'use strict';

const bcrypt = require('bcryptjs');

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
          isEmail: true,
          isDomainValid: value => {
            if (!value.match(/^[\w_.]*$@wolox.com.ar/))
              throw new Error('This domain does not belong to Wolox');
          }
        }
      },
      password: { allowNul: false, type: DataTypes.STRING, validate: { isAlphanumeric: true, len: [8, 24] } }
    },
    {}
  );
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};

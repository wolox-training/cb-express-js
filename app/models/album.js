'use strict';

module.exports = (sequelize, DataTypes) => {
  const album = sequelize.define(
    'Album',
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {}
  );
  album.associate = function(models) {
    // associations can be defined here
  };
  return album;
};

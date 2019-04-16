'use strict';

module.exports = (sequelize, DataTypes) => {
  const album = sequelize.define(
    'album',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      albumId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      albumName: {
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

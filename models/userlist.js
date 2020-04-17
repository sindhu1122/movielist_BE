'use strict';
module.exports = (sequelize, DataTypes) => {
  const Userlist = sequelize.define('Userlist', {
    userId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER,
    listType: DataTypes.STRING
  }, {});
  Userlist.associate = function(models) {
    // associations can be defined here
  };
  return Userlist;
};
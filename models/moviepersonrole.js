'use strict';
module.exports = (sequelize, DataTypes) => {
  const MoviePersonRole = sequelize.define('MoviePersonRole', {
    roleId: DataTypes.INTEGER,
    moviePersonId: DataTypes.INTEGER
  }, {});
  MoviePersonRole.associate = function(models) {
    // associations can be defined here
   
    models.MoviePerson.hasMany(MoviePersonRole,{foreignKey:"moviePersonId"})
   
  };
  return MoviePersonRole;
};
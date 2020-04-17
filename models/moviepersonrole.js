'use strict';
module.exports = (sequelize, DataTypes) => {
  const MoviePersonRole = sequelize.define('MoviePersonRole', {
    roleId: DataTypes.INTEGER,
    moviePersonId: DataTypes.INTEGER
  }, {});
  MoviePersonRole.associate = function(models) {
    // associations can be defined here
    MoviePersonRole.belongsTo(models.MoviePerson,{foreignKey:"moviePersonId"})
    models.MoviePerson.hasMany(MoviePersonRole,{foreignKey:"moviePersonId"})
    MoviePersonRole.belongsTo(models.Role,{foreignKey:"roleId"})
    models.Role.hasMany(MoviePersonRole,{foreignKey:"roleId"})
  };
  return MoviePersonRole;
};
'use strict';
const models=require('../models')
module.exports = (sequelize, DataTypes) => {
  const MoviePerson = sequelize.define('MoviePerson', {
    movieId: DataTypes.INTEGER,
    personId: DataTypes.INTEGER
  }, {});
  MoviePerson.associate = function(models) {
    // associations can be defined here
    MoviePerson.hasMany(models.MoviePersonRole,{foreignKey:"moviePersonId"})
    MoviePerson.belongsTo(models.Person,{foreignKey:"personId"})
    models.Person.hasMany(MoviePerson,{foreignKey:"personId"})
    MoviePerson.belongsTo(models.Movie,{foreignKey:"movieId"})
    models.Movie.hasMany(MoviePerson,{foreignKey:"movieId"})
  };
  return MoviePerson;
};
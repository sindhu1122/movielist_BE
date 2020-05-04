'use strict';
const models=require('../models')
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    movieName: DataTypes.STRING,
    releaseYear: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    imgURL: DataTypes.STRING,
    review: DataTypes.STRING
  }, {});
  Movie.associate = function(models) {
    // associations can be defined here
    Movie.hasMany(models.MoviePerson,{foreignKey:"movieId"})
    
  };
  return Movie;
};
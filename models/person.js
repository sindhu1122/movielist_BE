'use strict';
module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define('Person', {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {});
  Person.associate = function(models) {
    // associations can be defined here
    Person.hasMany(models.MoviePerson,{foreignKey:"personId"})
  };
  return Person;
};
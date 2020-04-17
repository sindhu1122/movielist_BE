'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    role: DataTypes.STRING
  }, {});
  Role.associate = function(models) {
    // associations can be defined here
    Role.hasMany(models.MoviePersonRole,{foreignKey:"roleId"})
  };
  return Role;
};
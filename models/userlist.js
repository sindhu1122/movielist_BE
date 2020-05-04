'use strict';
module.exports = (sequelize, DataTypes) => {
  const Userlist = sequelize.define('Userlist', {
    userId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER,
    listType: DataTypes.STRING
  }, {});
  Userlist.associate = function(models) {
    // associations can be defined here
   
    Userlist.hasMany(models.Movie,{foreignKey:"id",sourceKey:"movieId"})

   Userlist.belongsTo(models.User,{foreignKey:"userId"})
    
     
  };
  return Userlist;
};
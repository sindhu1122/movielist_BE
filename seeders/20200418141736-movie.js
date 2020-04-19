'use strict';
const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb("e5757d8592ad13ee79cd78f9d81e8fae")
const moment=require('moment')
const models=require('../models')
module.exports = {
  up: async(queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});

    */
   try{

    const res = await moviedb.miscPopularMovies()
    let movies=res.results;
    let moviedata=[];
    movies.map(async (item,key)=>{
      let data=[],name=[], actors=[],actress=[],director=null,producer=null;
     const movieId=await models.Movie.create({
        movieName:item.title,
        releaseYear:moment(item.release_date).format("YYYY"),
        imgURL:"https://image.tmdb.org/t/p/w185"+item.poster_path,
        rating: parseInt(item.vote_average,10),
     })
      
    const cast=await moviedb.movieCredits(item.id);
      cast.cast.map ( async item1=>{
       if(item1.gender===1 )
        { actress.push("female")
        const id=await models.Person.create({
            name:item1.name
        })
        const detail=await models.MoviePerson.create({
            personId:id.id,
            movieId:movieId.id
        })
        const movieper=await models.MoviePersonRole.create({
            moviePersonId:detail.id,
            roleId:2
        })
        
        }
        if(item1.gender===2 )
        { actors.push("a")
      
    const id=await models.Person.create({
        name:item1.name
    })
    const detail=await models.MoviePerson.create({
        personId:id.id,
        movieId:movieId.id
    })
    const movieper=await models.MoviePersonRole.create({
        moviePersonId:detail.id,
        roleId:1
    })
        }
      })
      cast.crew.map( async item2=>{
        if(item2.job==='Director')
         {
         const id=await models.Person.create({
            name:item2.name
        })
        const detail=await models.MoviePerson.create({
            personId:id.id,
            movieId:movieId.id
        })
        const movieper=await models.MoviePersonRole.create({
            moviePersonId:detail.id,
            roleId:3
        })
         }
         if(item2.job==='Producer')
         {
   
        const id=await models.Person.create({
            name:item2.name
        })
        const detail=await models.MoviePerson.create({
            personId:id.id,
            movieId:movieId.id
        })
        const movieper=await models.MoviePersonRole.create({
            moviePersonId:detail.id,
            roleId:4
        })
         }
       })
    
    })
  
}
catch(error){
error
}
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};

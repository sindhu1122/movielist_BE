const models = require('../../models');
const createMovie = async (req, res, next) => {
    try {
        
        const movie = {
            movieName: req.body.movieName,
            releaseYear:req.body.releaseYear,
            rating:req.body.rating,
            imgURL:''

         }
       const act = await models.Movie.create(movie)
       
        // const moviedetails=await models.Movie.findOne({
        //     where:{
        //         name:req.body.name
        //     }
        // })
        //console.log(moviedetails)
    
        const actordetails=await models.Person.findOne({
            where:{
                name:req.body.actor
            }
        })
        if(!actordetails)
        {
        const person={
            name:req.body.actor,
            // roleId:1,
            // movieId:moviedetails.id
        }
        const actor=await models.Person.create(person)
        const movieperson={
            movieId:act.id,
            personId:actor.id
        }
        const moviepersona=await models.MoviePerson.create(movieperson)
        const moviepersonroledata={
            roleId:1,
            moviePersonId:moviepersona.id
        }
        const moviepersonroleactor=await models.MoviePersonRole.create(moviepersonroledata)
       
    }
    const actressdetails=await models.Person.findOne({
        where:{
            name:req.body.actress
        }
    })
    if(!actressdetails)
    {
    const person={
        name:req.body.actress,
        // roleId:1,
        // movieId:moviedetails.id
    }
    const actress=await models.Person.create(person)
    const movieperson={
        movieId:act.id,
        personId:actress.id
    }
    const moviepersonact=await models.MoviePerson.create(movieperson)
    const moviepersonroledata={
        roleId:2,
        moviePersonId:moviepersonact.id
    }
    const moviepersonroleactress=await models.MoviePersonRole.create(moviepersonroledata)
   
}
const directordetails=await models.Person.findOne({
    where:{
        name:req.body.director
    }
})
if(!directordetails)
{
const person={
    name:req.body.director,
    // roleId:1,
    // movieId:moviedetails.id
}
const director=await models.Person.create(person)
const movieperson={
    movieId:act.id,
    personId:director.id
}
const moviepersondir=await models.MoviePerson.create(movieperson)
const moviepersonroledata={
    roleId:3,
    moviePersonId:moviepersondir.id
}
const moviepersonroledirector=await models.MoviePersonRole.create(moviepersonroledata)

}
const producerdetails=await models.Person.findOne({
    where:{
        name:req.body.producer
    }
})
if(!producerdetails)
{
const person={
    name:req.body.producer,
    // roleId:1,
    // movieId:moviedetails.id
}
const producer=await models.Person.create(person)
const movieperson={
    movieId:act.id,
    personId:producer.id
}
const moviepersonpro=await models.MoviePerson.create(movieperson)
const moviepersonroledata={
    roleId:4,
    moviePersonId:moviepersonpro.id
}
const moviepersonroleproduer=await models.MoviePersonRole.create(moviepersonroledata)
res.status(200).json({message:"success"})
}
}
    catch (error) {
        res.status(400).json({
            status: false,
            error
        })
    }
}
module.exports = createMovie;
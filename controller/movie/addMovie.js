const models = require('../../models');
const { successResponse, errorResponse } = require('../response/response')
/** @description This function adds the Movie to the database 
 * @param {object} req - Request object with movieName,actor,actress,director,producer,releaseYear,rating,imgUrl
 * @param {object} res -  Reponse object with success message if success or error message if there is an error.
 *  @returns {Promise}
*/
const addMovie = async (req, res, next) => {
    try {

        const movie = {
            movieName: req.body.movieName,
            releaseYear: req.body.releaseYear,
            rating: req.body.rating,
            imgURL: ''

        }
        const act = await models.Movie.create(movie)

        actorArray = req.body.actor
        actorArray.map(async (item, key) => {
            const actordetails = await models.Person.findOne({
                where: {
                    name: actorArray[key]
                }
            })
            if (!actordetails) {
                const person = {
                    name: actorArray[key],
                }
                const actor = await models.Person.create(person)
                const movieperson = {
                    movieId: act.id,
                    personId: actor.id
                }
                const moviepersona = await models.MoviePerson.create(movieperson)
                const moviepersonroledata = {
                    roleId: 1,
                    moviePersonId: moviepersona.id
                }
                const moviepersonroleactor = await models.MoviePersonRole.create(moviepersonroledata)
            }
            else {
                const movieperson = {
                    movieId: act.id,
                    personId: actordetails.id
                }
                const moviepersona = await models.MoviePerson.create(movieperson)
                const moviepersonroledata = {
                    roleId: 1,
                    moviePersonId: moviepersona.id
                }
                const moviepersonroleactor = await models.MoviePersonRole.create(moviepersonroledata)
            }
        })
        actressArray = req.body.actress
        actressArray.map(async (item, key) => {
            const actressdetails = await models.Person.findOne({
                where: {
                    name: actressArray[key]
                }
            })
            if (!actressdetails) {
                const person = {
                    name: actressArray[key]
                }
                const actress = await models.Person.create(person)
                const movieperson = {
                    movieId: act.id,
                    personId: actress.id
                }
                const moviepersonact = await models.MoviePerson.create(movieperson)
                const moviepersonroledata = {
                    roleId: 2,
                    moviePersonId: moviepersonact.id
                }
                const moviepersonroleactress = await models.MoviePersonRole.create(moviepersonroledata)
            }
            else {
                const movieperson = {
                    movieId: act.id,
                    personId: actressdetails.id
                }
                const moviepersonact = await models.MoviePerson.create(movieperson)
                const moviepersonroledata = {
                    roleId: 2,
                    moviePersonId: moviepersonact.id
                }
                const moviepersonroleactor = await models.MoviePersonRole.create(moviepersonroledata)
            }
        })
        const directordetails = await models.Person.findOne({
            where: {
                name: req.body.director
            }
        })
        if (!directordetails) {
            const person = {
                name: req.body.director,

            }
            const director = await models.Person.create(person)
            const movieperson = {
                movieId: act.id,
                personId: director.id
            }
            const moviepersondir = await models.MoviePerson.create(movieperson)
            const moviepersonroledata = {
                roleId: 3,
                moviePersonId: moviepersondir.id
            }
            const moviepersonroledirector = await models.MoviePersonRole.create(moviepersonroledata)

        }
        else {
            const movieperson = {
                movieId: act.id,
                personId: directordetails.id
            }
            const moviepersondir = await models.MoviePerson.create(movieperson)
            const moviepersonroledata = {
                roleId: 3,
                moviePersonId: moviepersondir.id
            }
            const moviepersonroleactor = await models.MoviePersonRole.create(moviepersonroledata)
        }
        const producerdetails = await models.Person.findOne({
            where: {
                name: req.body.producer
            }
        })
        if (!producerdetails) {
            const person = {
                name: req.body.producer,

            }
            const producer = await models.Person.create(person)
            const movieperson = {
                movieId: act.id,
                personId: producer.id
            }
            const moviepersonpro = await models.MoviePerson.create(movieperson)
            const moviepersonroledata = {
                roleId: 4,
                moviePersonId: moviepersonpro.id
            }
            const moviepersonroleproduer = await models.MoviePersonRole.create(moviepersonroledata)

        }
        else {
            const movieperson = {
                movieId: act.id,
                personId: producerdetails.id
            }
            const moviepersonpro = await models.MoviePerson.create(movieperson)
            const moviepersonroledata = {
                roleId: 4,
                moviePersonId: moviepersonpro.id
            }
            const moviepersonroleactor = await models.MoviePersonRole.create(moviepersonroledata)
        }
        result = successResponse(res)
        result
        logger.info("Movie added successfully")

    }
    catch (error) {
        result = errorResponse(error, res)
        result
        logger.error("Error! Unable to add movies")
        next(error)
    }
}
module.exports = addMovie;
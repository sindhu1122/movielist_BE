const models = require('../../models');
/** @description This function adds the Movie to the database 
 * @param {object} req - Request object with movieName,actor,actress,director,producer,releaseYear,rating,imgUrl
 * @param {object} res -  Reponse object with success message if success or error message if there is an error.
 * @param {requestCallback} next - The callback that calls the error handling middleware.
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

        k = req.body.actor
        for (i = 0; i < k.length; i++) {
            const actordetails = await models.Person.findOne({
                where: {
                    name: k[i]
                }
            })
            if (!actordetails) {
                const person = {
                    name: k[i],
                    // roleId:1,
                    // movieId:moviedetails.id
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
        }
        m = req.body.actress
        for (i = 0; i < m.length; i++) {
            const actressdetails = await models.Person.findOne({
                where: {
                    name: m[i]
                }
            })
            if (!actressdetails) {
                const person = {
                    name: m[i],
                    // roleId:1,
                    // movieId:moviedetails.id
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
        }
        const directordetails = await models.Person.findOne({
            where: {
                name: req.body.director
            }
        })
        if (!directordetails) {
            const person = {
                name: req.body.director,
                // roleId:1,
                // movieId:moviedetails.id
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
        const producerdetails = await models.Person.findOne({
            where: {
                name: req.body.producer
            }
        })
        if (!producerdetails) {
            const person = {
                name: req.body.producer,
                // roleId:1,
                // movieId:moviedetails.id
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
            res.status(200).json({ message: "success" })
        }
    }
    catch (error) {
        res.status(400).json({
            status: false,
            error
        })
        next(error)
    }
}
module.exports = addMovie;
const models = require('../../models');
const logger = require('../logger/logger')
const { successResponse, errorResponse } = require('../response/response')
/** @description This functions filter the movies based on the actors,actress,rating,year,director and producer
 * @param {object} req - Request object with queryParams with actors,actress,rating,year,director,producer
 * @param {object} res -  Reponse object with filtered movies list if success or error message if there is an error.
 * @param {requestCallback} next - The callback that calls the error handling middleware.
 *  @returns -List of Filtered Movies
*/
async function movieFilter(req, res, next) {
    try {
        let fields = {}, person = [], name1 = [], movie;
        if (req.query.rating) {
            fields = { ...fields, rating: req.query.rating }
        }
        if (req.query.year) {
            fields = { ...fields, releaseYear: req.query.year }
        }
        if (req.query.producer) {
            person.push(4)
            name1.push(JSON.parse(req.query.producer))
        }
        if (req.query.director) {
            person.push(3)
            name1.push(JSON.parse(req.query.director))
        }
        if (req.query.actress) {
            person.push(2)
            name1 = name1.concat(JSON.parse(req.query.actress))
        }
        if (req.query.actor) {
            person.push(1)
            name1 = name1.concat(JSON.parse(req.query.actor))
        }
        if (name1.length == 0) {
            movie = await models.Movie.findAll({
                where: fields
            })
        }
        else {
            movie = await models.Movie.findAll({
                where: fields,
                include: [{
                    model: models.MoviePerson,
                    required: true,
                    include: [{
                        model: models.Person,
                        where: { name: name1 },
                        required: true
                    },
                    {
                        model: models.MoviePersonRole,
                        where: { roleId: person }
                    }
                    ]
                }]



            })
        }

        result = successResponse(res, movie)
        result
        logger.info("movies based on filters are displayed")

    }
    catch (error) {
        result = errorResponse(error, res)
        result
        logger.error("Cannot load movies")
        next(error)
    }
}
module.exports = movieFilter;
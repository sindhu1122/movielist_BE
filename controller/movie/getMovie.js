const models = require('../../models');
const logger = require('../logger/logger')
const { successResponse, errorResponse } = require('../response/response')
/** @description This functions gives list of all movies present in the database
 * @param {object} req - Request object with the movieName
 * @param {object} res -  Reponse object with movie details if success or error message if there is an error.
 *  @returns -Returns details of searched movie
*/
const getMovie = async (req, res, next) => {
    try {


        const movie = await models.Movie.findAll({
            where: { movieName: req.params.movieName },
            include: [{
                model: models.MoviePerson,
                required: true,
                include: [{
                    model: models.Person,
                    required: true
                },
                { model: models.MoviePersonRole }


                ]
            }]

        })
        if (movie) {
            res.status(200).json({
                success: true,
                movieFound: true,
                data: movie
            })
            logger.info('Searched movie details are fetched')
        }
        else {
            res.status(200).json({
                success: true,
                movieFound: false
            })
            logger.info('Movie not found')

        }

    }
    catch (error) {
        errorResponse(error, res)
        logger.error('Error in fetching the movie detail')
    }
}
module.exports = getMovie;
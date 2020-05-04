const models = require('../../models');
const {successResponse,errorResponse}=require('../response/response')
const logger=require('../logger/logger')
/** @description This functions gives list of all movies present in the database
 * @param {object} req - Request object will be null
 * @param {object} res -  Reponse object with all the movies list  if success or error message if there is an error.
 * @param {requestCallback} next - The callback that calls the error handling middleware.
 *  @returns {Promise}
*/
const getMovie = async (req, res, next) => {
    try {
        const movie = await models.Movie.findAll({
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
       
        result=successResponse(res,movie)
        result
        logger.info('All the movies are displayed')

    }
    catch (error) {
        result=errorResponse(error,res)
        result
        logger.error('cannot get movie list')
        
    }
}
module.exports = getMovie;
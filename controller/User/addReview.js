const models = require('../../models');
const {successResponse,errorResponse}=require('../response/response')
const logger=require('../logger/logger')
/** @description  In This function  user can add review to the movie
 * @param {object} req - Request object with review
 * @param {object} res -  Reponse object with success message if success or error message if there is an error.
 * @param {requestCallback} next - The callback that calls the error handling middleware.
 *  @returns {Promise}
*/
async function addReview(req, res, next) {
    try {
        const movie = await models.Movie.findOne({
            where: {
                movieName: req.params.movieName
            }
        })
        const act = await models.Movie.update(req.body, {
            where: {
                id: movie.id
            }
        })

        result=successResponse(res)
        result
        logger.info('Review added successfully')
        
    }
    catch (error) {
        errorResponse(error)
        logger.error('Unable to add review')
        next(error)
    }
}
module.exports = addReview;

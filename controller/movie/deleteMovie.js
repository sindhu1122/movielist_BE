const models = require('../../models');
const logger=require('../logger/logger')
const {successResponse,errorResponse}=require('../response/response')
/** @description This functions deletes the Movie
 * @param {object} req - Request object with movie name
 * @param {object} res -  Reponse object with success message  if success or error message if there is an error.
 * @param {requestCallback} next - The callback that calls the error handling middleware.
 *  @returns {Promise}
*/
async function deleteMovie(req, res, next) {
    try {
        const deletedUser = await models.Movie.destroy({
            where: {
                movieName: req.params.name
            }
        })
        console.log(deletedUser)
        if(deletedUser)
       response= successResponse(res)
        response
        logger.info('Movie deleted successfully')
        
    }
    catch (error) {
       result=errorResponse(error,res)
       result
       logger.error('Cannot delete succssfullly ')
        next(error)
    }
}
module.exports = deleteMovie;
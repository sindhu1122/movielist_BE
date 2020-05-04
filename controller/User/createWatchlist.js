
const models = require('../../models')
const { successResponse, errorResponse } = require('../response/response')
const logger = require('../logger/logger')
/** @description In this function user can add movie to Watch List
 * @param {object} req - Request object is null
 * @param {object} res -  Reponse object with success message if success or error message if there is an error.
 *  @returns {Promise}
*/
const createWatchlist = async (req, res, next) => {
    try {
        const user = await models.User.findOne({
            where: {
                userName: req.params.userName
            }
        })
        const movie = await models.Movie.findOne({
            where: {
                movieName: req.params.movieName
            }
        })
        const obj = {
            userId: user.id,
            movieId: movie.id,
            listType: 'watch'
        }
        const list = await models.Userlist.create(obj)
        result = successResponse(res)
        result
        logger.info('Movie added to watch list')
    }

    catch (error) {
        result = errorResponse(res)
        result
        logger.error('Unable to add movie to watchlist')

    };
}
module.exports = createWatchlist
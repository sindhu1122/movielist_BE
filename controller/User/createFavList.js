var jwt = require('jsonwebtoken')
const models = require('../../models')
const { successResponse, errorResponse } = require('../response/response')
const logger = require('../logger/logger')
/** @description In this function user can add movie to Favourite List
 * @param {object} req - Request object is null
 * @param {object} res -  Reponse object with success message if success or error message if there is an error.
 *  @returns {Promise}
*/
const createFavList = async (req, res, next) => {
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
            listType: 'fav'
        }
        const list = await models.Userlist.create(obj)
        result = successResponse(res)
        result
    }

    catch (error) {
        result = errorResponse(error, res)
        result
        logger.error('Unable to add to favourite list')

    };
}
module.exports = createFavList
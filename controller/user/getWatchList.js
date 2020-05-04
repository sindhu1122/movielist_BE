const models = require('../../models');
const logger = require('../logger/logger')
const { successResponse, errorResponse } = require('../response/response')
/** @description This functions gives list of all movies present in the watchlist
 * @param {object} req - Request object will be null
 * @param {object} res -  Reponse object with all the movies list  if success or error message if there is an error.
 * @param {requestCallback} next - The callback that calls the error handling middleware.
 *  @returns -Movies present in the watch list are returned
*/
const getWatchList = async (req, res, next) => {
    try {

        const userWatchList = await models.User.findAll({
            where: { userName: req.params.userName },
            include: [{
                model: models.Userlist,
                where: { listType: 'watch' },
                include: [{
                    model: models.Movie,
                    required: true,
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

                }]
            }]
        })

        result = successResponse(res, userWatchList)
        result
        logger.info('All the movies in watch list are listed')
    }
    catch (error) {
        result = errorResponse(error, res)
        result
        logger.error('Cannot fetch watch list')
        next(error)
    }
}

module.exports = getWatchList
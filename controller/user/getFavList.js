const models = require('../../models');
const logger = require('../logger/logger')
const { successResponse, errorResponse } = require('../response/response')
/** @description This functions gives list of all movies present in the favorite list
 * @param {object} req - Request object will be null
 * @param {object} res -  Reponse object with all the movies list  if success or error message if there is an error.
 *  @returns Movies present in the Favourite list are returned
*/
const getFavList = async (req, res, next) => {
    try {

        const userFavList = await models.User.findAll({
            where: { userName: req.params.userName },
            include: [{
                model: models.Userlist,
                where: { listType: 'fav' },
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

        result = successResponse(res, userFavList)
        result
        logger.info('All the movies in watch list are listed')
    }
    catch (error) {
        result = errorResponse(error, res)
        result
        logger.error('Cannot fetch the favlist')
    }
}

module.exports = getFavList
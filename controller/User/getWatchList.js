const models = require('../../models');
var jwt = require('jsonwebtoken')
const logger=require('../logger/logger')
const {successResponse,errorResponse}=require('../response/response')
/** @description This functions gives list of all movies present in the watchlist
 * @param {object} req - Request object will be null
 * @param {object} res -  Reponse object with all the movies list  if success or error message if there is an error.
 * @param {requestCallback} next - The callback that calls the error handling middleware.
 *  @returns {Promise}
*/
const getWatchList = async (req, res, next) => {
    try {

        const user = await models.User.findOne({
            where: {
                userName: req.params.userName
            }
        })
        const list = await models.Userlist.findAll({
            where: {
                userId: user.id,
                listType: 'watch'

            }
        })

        let movieslist = [],
        a=[1,2,3]
        obj = [...JSON.parse(JSON.stringify(list, null, 4))];
        for(i=0;i<obj.length;i++) {
            var movie = await models.Movie.findOne({
                where: { id: obj[i].movieId },
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
            
            
            movieslist.push(movie)

        }
        result=successResponse(res,movieslist)
        result
        logger.info('All the movies in watch list are listed')
    }
    catch (error) {
        result=errorResponse(error,res)
        result
        logger.error('Cannot fetch watch list')
        next(error)
    }
}

module.exports = getWatchList
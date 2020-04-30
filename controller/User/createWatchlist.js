var jwt = require('jsonwebtoken')
const models = require('../../models')
/** @description In this function user can add movie to Watch List
 * @param {object} req - Request object is null
 * @param {object} res -  Reponse object with success message if success or error message if there is an error.
 * @param {requestCallback} next - The callback that calls the error handling middleware.
 *  @returns {Promise}
*/
const createWatchlist = async (req, res, next) => {
    try {
        const token = req.headers['access-token']
        const payload = jwt.decode(token)
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
            listType: "watch"
        }
        console.log(obj)
        const list = await models.Userlist.create(obj)
        res.status(200).json({
            message: "success"
        })
    }

    catch (error) {
        res.status(400).json({
            error
        })
        next(erro)
    };
}
module.exports = createWatchlist
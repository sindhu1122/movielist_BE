const models = require('../../models');
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
        res.status(200).json({
            deletedUser
        })
    }
    catch (error) {
        next(error)
    }
}
module.exports = deleteMovie;
const models = require('../../models');
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

        res.status(200).json({
            message: success

        })
    }
    catch (error) {
        next(error)
    }
}
module.exports = addReview;

const models = require('../../models');
/** @description This functions gives list of all movies present in the database
 * @param {object} req - Request object with the movieName
 * @param {object} res -  Reponse object with movie details if success or error message if there is an error.
 * @param {requestCallback} next - The callback that calls the error handling middleware.
 *  @returns {Promise}
*/
const getMovie = async (req, res, next) => {
    try {


        const movie = await models.Movie.findAll({
            where: { movieName: req.params.movieName },
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
        if (movie)
            res.status(200).json({
                msg: true,
                movie
            })


        //console.log(movie[0].MoviePeople[0].Person.name) 
        else {
            res.status(200).json({
                msg: false,
            })


        }
    }
    catch (error) {
        res.status(400).json({
            status: false,
            error
        })
    }
}
module.exports = getMovie;
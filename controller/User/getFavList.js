const models = require('../../models');
var jwt = require('jsonwebtoken')
/** @description This functions gives list of all movies present in the favorite list
 * @param {object} req - Request object will be null
 * @param {object} res -  Reponse object with all the movies list  if success or error message if there is an error.
 * @param {requestCallback} next - The callback that calls the error handling middleware.
 *  @returns {Promise}
*/
const getFavList = async (req, res, next) => {
    try {

        const token = req.headers['access-token']
        const payload = jwt.decode(token)
        const user = await models.User.findOne({
            where: {
                userName: req.params.userName
            }
        })
        const list = await models.Userlist.findAll({
            where: {
                userId: user.id,
                listType: "fav"

            }
        })
        var movieslist = []
        obj = [...JSON.parse(JSON.stringify(list, null, 4))];
        for (i = 0; i < obj.length; i++) {
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
            //    console.log(JSON.stringify(movie))
            movieslist.push((movie))
            console.log(movieslist)

        }
        res.status(200).json({
            movieslist

        })
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "There is no list",
            error
        })
        next(error)
    }
}

module.exports = getFavList
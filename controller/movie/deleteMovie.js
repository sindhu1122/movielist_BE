const models = require('../../models');
async function deleteMovie (req, res, next) {
    try{
    const deletedUser = await models.Movie.destroy({
        where: {
            movieName:req.params.name
        }
    })
    res.status(200).json({
        deletedUser
    })}
    catch(error)
    {
        next(error)
    }
}
module.exports= deleteMovie;
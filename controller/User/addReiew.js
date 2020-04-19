const models = require('../../models');
async function addReview (req, res, next) {
    try{
    const movie = await models.Movie.findOne({
        where: {
            movieName:req.params.movieName
        }
    })
    
        const act=await models.Movie.update(req.body,{
            where:{
                id:movie.id
            }

        })
        
    
    res.status(200).json({
        act
        
    })}
    catch(error)
    {
        next(error)
    }
}
module.exports= addReview;

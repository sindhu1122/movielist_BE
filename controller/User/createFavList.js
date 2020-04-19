var jwt = require('jsonwebtoken')
const models=require('../../models')
const createFavList = async (req, res, next) => {
    try {
        const token = req.headers['access-token']
        const payload = jwt.decode(token)
        const user = await models.User.findOne({
            where: {
                userName: payload.userName
            }
        })
        const movie=await models.Movie.findOne({
            where:{
                movieName:req.params.movieName
            }
        })
       const obj={
            userId:user.id,
            movieId:movie.id,
            listType:"fav"
        }
        console.log(obj)
        const list=await models.Userlist.create(obj)
        res.status(200).json({
            list
        })
    }

    catch(error){
            res.status(400).json({
                error
            })
    };
}
module.exports=createFavList
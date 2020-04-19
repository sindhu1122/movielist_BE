const models = require('../../models');
var jwt = require('jsonwebtoken')
const getWatchList = async (req, res, next) => {
    try {
        
        const token = req.headers['access-token']
        const payload = jwt.decode(token)
        const user = await models.User.findOne({
            where: {
                userName: payload.userName
            }
        })
        const list=await models.Userlist.findAll({
            where:{
                userId:user.id,
                listType:"fav"
                
            }
        })
        var movieslist=[]
        obj = [...JSON.parse(JSON.stringify(list, null, 4))];
        for(i=0;i<obj.length;i++){
            var movie=await models.Movie.findOne({
                where:{id:obj[i].movieId} ,
                include:[{
                    model:models.MoviePerson,
                    required:true,
                    include:[{
                        model:models.Person,
                        required:true},
                        {model:models.MoviePersonRole}
                       
                        
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

module.exports = getWatchList
const models = require('../../models');
const getMovie = async (req, res, next) => {
    try {
        const movie=await models.Movie.findAll({
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
        console.log(movie[0].MoviePeople[0].Person.name)       
        res.status(200).json({
            movie
        })
        
    }
    catch (error) {
        res.status(400).json({
            status: false,
            error
        })
    }
}
module.exports=getMovie;
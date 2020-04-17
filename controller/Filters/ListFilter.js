// const models = require('../../models');
// const ListFilter = async (req, res, next) => {
//     try {
        
//        if(req.params.movie){
//         const movie=await models.Movie.findOne({
//             where:{
//                 name:req.params.movie
//             }
//         })
//         const movieperson=await models.MoviePerson.findOne({
//             where:{
//                 movieId:movie.id
//             }
//         })
//         const person=await models.Person.findAll({
//             // where:{MovieId:req.params.movieId} 
//             include:[{
//                 model:models.MoviePerson,
//                 required:true,
//                 where:{personId:movieperson.personId}
                
//             }]
//         })
//         res.status.json({
//             person
//         })
//     }
    
//     // if(req.params.age){
//     //     const person=await models.Person.findOne({
//     //         where:{
//     //             age:req.params.age
//     //         }
//     //     })
//     // }
//     }
//     catch (error) {
//         res.status(400).json({
//             status: false,
//             error
//         })
//     }
// }
// module.exports=ListFilter
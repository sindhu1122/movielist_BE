const models = require('../../models');
const createMovie = async (req, res, next) => {
    try {
        
        // const movie = {
        //     movieName: req.body.movieName,
        //     releaseYear:req.body.releaseYear,
        //     rating:req.body.rating,
        //     imgURL:''

        //  }
        let moviepersonrole;
        let result=[]
       const act = await models.Movie.update(req.body,{
           where:{movieName:req.params.movieName}
       })
       
        const moviedetails=await models.Movie.findOne({
            where:{
                movieName:req.body.movieName
            }
        })

        const movieperson =await models.MoviePerson.findAll({
            where:{movieId:moviedetails.id}
        })
        obj = [...JSON.parse(JSON.stringify(movieperson, null, 4))];
        console.log(obj)
        for(i=0;i<obj.length;i++)
        {
             moviepersonrole=await models.MoviePersonRole.findOne({
                where:{moviePersonId:obj[i].id}
            })
        
            if(moviepersonrole.roleId==1){
                o={name:req.body.actor}
            const person=await models.Person.update(o,{
                where:{
                    id:movieperson[i].personId,
                }
            })
        }
        else if(moviepersonrole.roleId==2){
            o={name:req.body.actress}
            const person=await models.Person.update(o,{
                where:{
                    id:movieperson[i].personId,
                }
            })
        }
        else if(moviepersonrole.roleId==3){
            o={name:req.body.director}
            const person=await models.Person.update(o,{
                where:{
                    id:movieperson[i].personId,
                }
            })
        }
         if(moviepersonrole.roleId==4){
            o={name:req.body.producer}
            const person=await models.Person.update(o,{
                where:{
                    id:movieperson[i].personId,
                }
            })
        }
        result.push( moviepersonrole)
    }
res.status(200).json({message:success})
}

    catch (error) {
        res.status(400).json({
            status: false,
            error
        })
    }
}
module.exports = createMovie;
const models=require('../../models');
async function movieFilter(req,res,next)
{
    try{let fields={},person=[],name1=[],movie;
        if(req.query.rating)
        {
           fields={...fields,rating:req.query.rating}
        }
        if(req.query.year)
        {
           fields={...fields,releaseYear:req.query.year}
        }
        if(req.query.producer)
        {
          person.push(4)
         name1.push(JSON.parse(req.query.producer))
         }
        if(req.query.director)
        {
            person.push(3)
            name1.push(JSON.parse(req.query.director))
        }
        if(req.query.actress)
        {
          person.push(2)
         name1=name1.concat(JSON.parse(req.query.actress))
        }
        if(req.query.actor)
        {
            person.push(1)
            name1=name1.concat(JSON.parse(req.query.actor))
        }
        console.log(name1,fields)
        if(name1.length==0){
             movie = await models.Movie.findAll({
                where:fields
            })
        }
        else{
          movie = await models.Movie.findAll({
             where:fields,
             include:[{
                model:models.MoviePerson,
                required:true,
                include:[{
                    model:models.Person,
                    where:{name:name1},
                    required:true
                },
                    {model:models.MoviePersonRole,
                    where:{roleId:person}}   
                ]
            }]
    
           
    
        })
    }
    res.status(200).json({
        movie
        
    })
    }
    catch(err){
        res.status(400).json({
            message:"error"
        })
        next(err)
    }
}
module.exports=movieFilter;
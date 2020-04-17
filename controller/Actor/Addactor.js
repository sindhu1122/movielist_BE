const models = require('../../models');
const Addactor = async (req, res, next) => {
    try {
        
       
        const actordetails=await models.Person.findOne({
            where:{
                name:req.body.name
            }
        })
        if(actordetails)
        {
            const act=await models.Person.update(req.body,{
                where:{
                    id:actordetails.id
                }

            })
            res.json({
                act
            })
        }
        else{
            
            const actors=await models.Person.create(req.body)
            res.json({actors})
        }
       
    }
    catch (error) {
        res.status(400).json({
            status: false,
            error
        })
    }
}
module.exports=Addactor
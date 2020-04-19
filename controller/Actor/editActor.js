const models = require('../../models');
const editActor = async (req, res, next) => {
    try {
        
       
        const actordetails=await models.Person.findOne({
            where:{
                name:req.params.name
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
            
        
            res.json("actor is not present")
        }
       
    }
    catch (error) {
        res.status(400).json({
            status: false,
            error
        })
    }
}
module.exports=editActor
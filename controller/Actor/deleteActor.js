const models = require('../../models');
async function deleteUser (req, res, next) {
    try{
    const deletedUser = await models.Person.destroy({
        where: {
            name:req.params.name
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
module.exports= deleteUser;
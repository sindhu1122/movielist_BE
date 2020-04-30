const models = require('../../models');
/** @description This functions edit the details of the person like actor,actress,director,producer
 * @param {object} req - Request object with person name to be edited and new name and age 
 * @param {object} res -  Reponse object with success message  if success or error message if there is an error.
 * @param {requestCallback} next - The callback that calls the error handling middleware.
 *  @returns {Promise}
*/
const editPerson = async (req, res, next) => {
    try {


        const actordetails = await models.Person.findOne({
            where: {
                name: req.params.name
            }
        })
        if (actordetails) {
            const act = await models.Person.update(req.body, {
                where: {
                    id: actordetails.id
                }

            })
            res.status(200).json({
                message: "updated successfully"
            })
        }
        else {


            res.status(201).json({ message: "actor is not present" })
        }

    }
    catch (error) {
        res.status(400).json({
            status: false,
            error
        })
    }
}
module.exports = editPerson
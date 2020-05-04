const models = require('../../models');
const {successResponse,errorResponse}=require('../response/response')
const logger=require('../logger/logger')
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
            result=successResponse(res)
            result
            logger.info('Updated successfully')
        }
        else
        logger.info('person is not present')

    }
    catch (error) {
       result=errorResponse(res)
       result
       next(error)
    }
}
module.exports = editPerson
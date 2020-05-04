const models = require('../../models');
const {successResponse,errorResponse}=require('../response/response')
/** @description This functions deletes the persons included in the movie
 * @param {object} req - Request object with person name
 * @param {object} res -  Reponse object with success message  if success or error message if there is an error.
 * @param {requestCallback} next - The callback that calls the error handling middleware.
 *  @returns {Promise}
*/
async function deletePerson(req, res, next) {
    try {
        const deletedUser = await models.Person.destroy({
            where: {
                name: req.params.name
            }
        })
       result=successResponse(res)
       result
       logger.info('Person deleted successfully')
    }
    catch (error) {
        result=errorResponse(error,res)
        result
        logger.error('Cannot delete successfully')
        next(error)
    }
}
module.exports = deletePerson;

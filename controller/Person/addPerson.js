const models = require('../../models');
const logger=require('../logger/logger')
const {successResponse,errorResponse}=require('../response/response')
/** @description Adding movie persons like actor,actress,director,producer.If the person name already exists then it updated the changes
 * @param {object} req - Request object with name and age
 * @param {object} res -  Returns Reponse object with details of the newly created person, otherwise it updates the existing user details
 * @param {requestCallback} next - The callback that calls the error handling middleware.
 *  @returns {Promise}
*/
const addPerson = async (req, res, next) => {
    try {

        const act = ''
        const actordetails = await models.Person.findOne({
            where: {
                name: req.body.name
            }
        })
        if (actordetails) {
            obj = {
                name: req.body.name,
                age: req.body.age
            }
            act = await models.Person.update(obj, {
                where: {
                    id: actordetails.id
                }

            })
           
        }
        else {
            n = {
                name: req.body.name,
                age: req.body.age
            }
            const actors = await models.Person.create(n)
            person = {
                personId: actors.id
            }
            const movieperson = await models.MoviePerson.create(person)
            obj = {
                roleId: req.body.roleId,
                moviePersonId: movieperson.id

            }
            const moviepersonrole = await models.MoviePersonRole.create(obj)
            result=successResponse(res)
            result
            logger.info('person added successfully')
        }

    }
    catch (error) {
       result=errorResponse(error,res)
       result
       logger.error('Cannot add person')
        next(error)
    }
}
module.exports = addPerson
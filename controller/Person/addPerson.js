const models = require('../../models');
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
            res.json({
                success: "updated details"
            })
        }
        else {
            n = {
                name: req.body.name,
                age: req.body.age
            }

            console.log(req.body)
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
            res.json({ actors })
        }

    }
    catch (error) {
        res.status(400).json({
            status: false,
            error
        })
        next(error)
    }
}
module.exports = addPerson
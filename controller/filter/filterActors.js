const models = require('../../models');
const logger = require('../logger/logger')
const { successResponse, errorResponse } = require('../response/response')
/** @description This functions filter the actors based on the age and movies they acted
 * @param {object} req - Request object with queryParams with age,movie name
 * @param {object} res -  Reponse object with filtered persons list if success or error message if there is an error.
 * @param {requestCallback} next - The callback that calls the error handling middleware.
 *  @returns -list of Filtered Actors
*/
const listFilter = async (req, res, next) => {
    try {
        person = []
        if (req.query.movieName) {
            const moviedetails = await models.Movie.findOne({
                where: {
                    movieName: req.query.movieName
                }
            })
            const movieperson = await models.MoviePerson.findAll({
                where: {
                    movieId: moviedetails.id
                }
            })

            obj = [...JSON.parse(JSON.stringify(movieperson, null, 4))];

            await obj.map(async (item, key) => {
                const moviepersonrole = await models.MoviePersonRole.findOne({
                    where: {
                        moviePersonId: obj[key].id,

                    }
                })
                if (moviepersonrole.roleId == 1 || moviepersonrole.roleId == 2) {
                    if (req.query.age) {

                        const actordetails = await models.Person.findOne({
                            where: {
                                id: obj[key].personId,
                                age: req.query.age,

                            }
                        })
                        if (actordetails)
                            person.push(actordetails.name)
                    }
                    else {

                        const actordetails1 = await models.Person.findOne({
                            where: {
                                id: obj[key].personId,
                            }
                        })
                        person.push(actordetails1.name)
                    }
                }

            })

        }
        else if (req.query.age) {
            person = []
            persons = await models.Person.findAll({
                where: {
                    age: req.query.age
                }
            })
            obj1 = [...JSON.parse(JSON.stringify(persons, null, 4))];
            obj1.map(item => {
                person.push(item.name)
            })

        }

        let result = successResponse(res, person)
        result
        logger.info("Filtered list are displayed")

    }
    catch (error) {
        result = errorResponse(error, res)
        result
        logger.error("Cannot get filtered list")
        next(error)
    }
}
module.exports = listFilter
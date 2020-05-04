const models = require('../../models');
/** @description This functions filter the actors based on the age and movies they acted
 * @param {object} req - Request object with queryParams with age,movie name
 * @param {object} res -  Reponse object with filtered persons list if success or error message if there is an error.
 * @param {requestCallback} next - The callback that calls the error handling middleware.
 *  @returns {Promise}
*/
const listFilter = async (req, res, next) => {
    try {
        let c = 0, a = 0, personsarray = []

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
            // const moviepersonrole=await models.MoviePersonRole.findAll({
            //     where:{
            //         moviePersonId:movieperson.id
            //     }
            // })
            obj = [...JSON.parse(JSON.stringify(movieperson, null, 4))];
            person = []
            console.log(obj)
            for (i = 0; i < obj.length; i++) {
                const moviepersonrole = await models.MoviePersonRole.findOne({
                    where: {
                        moviePersonId: obj[i].id,

                    }
                })
                if (moviepersonrole.roleId == 1 || moviepersonrole.roleId == 2) {
                    if (req.query.age) {

                        const actordetails = await models.Person.findOne({
                            where: {
                                id: obj[i].personId,
                                age: req.query.age,

                            }
                        })
                        if (actordetails)
                            person.push(actordetails.name)
                    }
                    else {

                        const actordetails1 = await models.Person.findOne({
                            where: {
                                id: obj[i].personId,
                            }
                        })
                        person.push(actordetails1.name)
                    }
                }
                c = 1

            }

        }
        else if (req.query.age) {
            person = []
            persons = await models.Person.findAll({
                where: {
                    age: req.query.age
                }
            })
            obj1 = [...JSON.parse(JSON.stringify(persons, null, 4))];
            console.log(obj1)
            obj1.map(item => {
                person.push(item.name)
            })
            a = 1

            //res.status(200).json({persons})

        }

        if (c == 1 && a == 1) {
            res.status(200).json({ person })
        }
        else if (c == 1 && a == 0) {
            res.status(200).json({ person })
        }
        else if (a == 1 && c == 0) {
            res.status(200).json({ person })
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
module.exports = listFilter;
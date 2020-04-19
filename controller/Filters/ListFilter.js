const models = require('../../models');
const listFilter = async (req, res, next) => {
    try {
        let c = 0, a = 0

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
            person = []
            //console.log(obj)
            for (i = 0; i < obj.length; i++) {
                if (req.query.age) {
                    const actordetails = await models.Person.findOne({
                        where: {
                            id: obj[i].personId,
                            age: req.query.age
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
        if (req.query.age) {
            persons = await models.Person.findAll({
                where: {
                    age: req.query.age
                }
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
            res.status(200).json({ persons })
        }
    }
    catch (error) {
        res.status(400).json({
            status: false,
            error
        })
    }
}
module.exports = listFilter;
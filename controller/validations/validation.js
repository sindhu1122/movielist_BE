const Joi = require('joi');
var _ = require('underscore');
const signUpValidation = async (req, res, next) => {
    try {
        const signupDataSchema = Joi.object({
            userName: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            email: Joi.string().email({ minDomainAtoms: 2 })
        })
        const value = await signupDataSchema.validate({ userName: req.body.userName, password: req.body.password, email: req.body.email });
        next();
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: _.first(error.details).message
        })
    }
}
const filterValidation = async (req, res, next) => {
    try {
        const loginData = Joi.object({
            rating: Joi.number(),
            year: Joi.number(),
            producer: Joi.string(),
            director: Joi.string(),
            actor: Joi.array().items(Joi.string()),
            actress: Joi.array().items(Joi.string())

        })
        const value = await loginData.validate({
            rating: req.query.rating, producer: req.query.producer, director: req.query.director,
            year: req.query.year,
            actor: req.query.actor,
            actress: req.query.actress
        });
        next();
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message:_.first(error.details).message
        })

    }
}
const filterActors = async (req, res, next) => {
    try {
        console.log(req.query.movieName)
        const filterData = Joi.object().keys({
            age: Joi.number(),
            movieName: Joi.string()
        })

        const value = Joi.validate({ age: req.query.age, movieName: req.query.movieName }, filterData)
        //Joi.validate(undefined, Joi.string()); 
        next()
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message:_.first(error.details).message
        })
    }
}
const addMovie = async (req, res, next) => {

    try {
        const schema = Joi.object().keys({
            movieName: Joi.string().required(),
            year: Joi.number().min(4).max(4).required(),
            rating: Joi.number().min(1).max(1).required(),
            actor: Joi.array().items(Joi.string()),
            actress: Joi.array().items(Joi.string()),
            producer: Joi.string.alpha().required(),
            director: Joi.string.alpha().required()

        })
        const value = await schema.validate({
            rating: req.query.rating,
            producer: req.body.producer,
            director: req.body.director,
            movieName: req.body.movieName,
            year: req.body.year,
            actor: req.body.actor,
            actress: req.body.actress
        });
        next();
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message:_.first(error.details).message
        })
    }
}
const editMovies = async (req, res, next) => {

    try {
        const schema = Joi.object().keys({
            movieName: Joi.string().required(),

        })
        const value = await schema.validate({

            movieName: req.params.movieName,

        });
        next();
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: _.first(error.details).message
        })
    }
}
const addPerson = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            name: Joi.string().required()
        })
        const value = await schema.validate({

            name: req.body.name,

        });
        next()
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: _.first(error.details).message
        })

    }
}
module.exports = { signUpValidation, filterValidation, filterActors, addMovie, editMovies, addPerson };

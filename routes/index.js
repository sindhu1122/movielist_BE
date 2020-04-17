const express = require('express');
const router = express.Router(); // initialize router
const createUser=require('../controller/User/createUser')
const createMovie=require('../controller/movie/Addmovie')
const addActor=require('../controller/Actor/Addactor')
const getUser=require('../controller/User/login')
const getMovie=require('../controller/movie/getMovie')
const listFilter=require('../controller/Filters/ListFilter')
const getAllMovies=require('../controller/movie/getAllMovies')
router.post('/movieadd',createMovie)
router.post('/signup',createUser)
router.post('/login',getUser)
router.post('/addactors',addActor)
router.get('/getmovie/:movieId',getMovie)
router.get('/filteractors/:movie',listFilter)
router.get('/getallmovies',getAllMovies)
module.exports=router
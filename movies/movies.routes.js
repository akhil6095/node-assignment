let express = require('express');
let router = express.Router();

const moviesController = require('./MoviesController')
const authorize = require('../middleware/authorize') 

router.get('/', authorize(['ADMIN']), moviesController.getAllMovies)
router.get('/:key', moviesController.getMoviesById)
router.post('/',authorize(['ADMIN']), moviesController.createMovie)
router.put('/:key', authorize(['ADMIN']), moviesController.updateMovie)
router.get('/mostviewed', authorize(['ADMIN']), moviesController.getMostViewedMovie)

module.exports = router;

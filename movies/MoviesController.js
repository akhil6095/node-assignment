const movieService = require('./movies.service');
const {  ApiResponse } = require('../models/ApiResponse')


function getAllMovies(req, res) {
    let page = req.query.page || 1
    let size = req.query.size || 10
    movieService.getAllMovies(page,size)
    .then(movies => {
        res.status(200).send(new ApiResponse(200, "Fetched movies successfully", movies))
    }).catch(error => {
        res.status(500).send(new ApiResponse(500, "Error in fetching movies"))
    })
}

function createMovie(req, res) {
    movieService.createMovie(req.body)
    .then(result => {
        return movieService.getMovieById(result.id)
    }).then(result => {
        return res.status(200).json(new ApiResponse(202, "Movie created", result))
    })
    .catch(error => {
        return  res.status(500).json(new ApiResponse(500, "Error while creating movie"))
    });
}

function updateMovie(req, res) {
    movieService.updateMovie(req.params.key, req.body)
    .then(result => {
        return movieService.getMovieById(req.params.key)
    }).then(result => res.status(200).json(new ApiResponse(202, "Movie updated", result)))
    .catch(error => res.status(500).json(new ApiResponse(500, "Error while updating movie")));
}

function getMoviesById(req, res) {
    movieService.getMovieById(req.params.key)
    .then(movie => res.status(200).send(new ApiResponse(200, "Movie fetched successfully", movie))
    ).catch(error =>  res.status(500).send(new ApiResponse(500, "Error while fetching movie")))
}

function getMostViewedMovie(req, res){
    movieService.getMostViewedMovie()
    .then(result => res.status(200).send(new ApiResponse(200, "Most viewed movie fetched successfully", result)))
    .catch(error => {
        console.log("error", error)
      return   res.status(500).send(new ApiResponse(500, "Error while fetching detail"))
    })
}

module.exports = {
    getAllMovies,
    createMovie,
    getMoviesById,
    updateMovie,
    getMostViewedMovie
};

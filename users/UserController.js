const Sequelize = require('sequelize')
const Op = Sequelize.Op

const userService = require('./User.service')
const {  ApiResponse } = require('../models/ApiResponse')


function getUserByEmail(req, res) {
    
    userService.getUserByEmail(req.params.key)
    .then(user =>{
        return res.status(200).json(new ApiResponse(200, "User fetched successfullly", user))    
    }).catch(error => {
        return res.status(500).json(new ApiResponse(500, "Error while fetching user"))  
    });
}

function authenticate(req, res) {
    userService.authenticate(req.body)
        .then(user => res.status(200).json(new ApiResponse(200, "User authenitcated successfullly", user))    )
        .catch(error =>  res.status(401).json(new ApiResponse(401, "Error while fetching user")))
}

function registerUser(req, res) {
    let email = req.body.email

    if (!email){
        return res.status(400).json(new ApiResponse(400, "Email cannot be empty"))    
    }
    
    userService.createUser(req.body)
    .then(result => {
       return userService.getUserById(result.id)
    })
    .then(user =>{
        return res.status(200).json(new ApiResponse(202, "User added", user))    
    }).catch(error => {
        console.log(error)
        return res.status(500).json(new ApiResponse(500, "Error while saving user"))    
    });
}


function captureUserMoviewView(req,res){
    userService.saveUserMovieView(req.params.userId, req.params.movieId)
    .then(resp => res.status(200).json(new ApiResponse(200, "Movie viewed captured"))    )
        .catch(error =>  res.status(500).json(new ApiResponse(500, "Error while capturing movie view")))
}

module.exports = {
    getUserByEmail,
    registerUser,
    authenticate,
    captureUserMoviewView
}

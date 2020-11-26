const jwt = require('express-jwt');
const { secret } = require('../config/config.json');
const { Users } = require('../sequelize');
const {  ApiResponse } = require('../models/ApiResponse')

module.exports = authorize;

function authorize(roles=['USER']) {
    return [
        // authenticate JWT token and attach decoded token to request as req.user
        jwt({ secret, algorithms: ['HS256'] }),

        // attach full user record to request object
        async (req, res, next) => {
            // get user with id from token 'sub' (subject) property
            const user = await Users.findByPk(req.user.sub);

            // check user still exists
            if (!user)
                return res.status(404).json(new ApiResponse(404, "User not found"))    

            let authenticatedUser =  user.get();

            if (!validateRoles(authenticatedUser.roles, roles)){
                return res.status(401).json(new ApiResponse(401, "User not authorized"))    
            }
            req.user = authenticatedUser
            next();
        }
    ];
}

function validateRoles (userRoles, expectedRoles) {
    let isAuthorized = false;
    userRoles.array.forEach(role => {
       isAuthorized = expectedRoles.includes(role) 
    });
    return isAuthorized
}
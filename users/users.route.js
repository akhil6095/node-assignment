let express = require('express');
let router = express.Router();

const authorize = require('../middleware/authorize') 
const userController = require('./UserController')

router.get('/:key', authorize(), userController.getUserByEmail)
router.post('/', userController.registerUser)
router.post('/authenticate', userController.authenticate)
router.post('/:userId/movies/:movieId',authorize(), userController.captureUserMoviewView)


module.exports = router;

const config = require('../config/config.json');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Users, UserMovieViewModel } = require('../sequelize')

async function authenticate({ email, password }) {
    const user = await getUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password)))
        throw 'Username or password is incorrect';

    // authentication successful
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
    return { ...omitHash(user.get()), token };
}

async function getUserByEmail(email) {
    return await  Users.findOne({ where: { email: email } })
}

async function createUser(params) {
    if (await getUserByEmail(params.email)) {
        throw 'Username "' + params.username + '" is already taken';
    }
    if (params.password) {
        params.password = await bcrypt.hash(params.password, 10);
    }
    return await Users.create(params);
}

async function getUserById(id){
    return await Users.findOne({ where: { id: id } })
}


async function saveUserMovieView(userId, movieId){
    let userMovieView = await UserMovieViewModel.findOne({ where: { userId: userId, movieId: movieId} })

    if (userMovieView){
        userMovieView.viewCount = userMovieView.viewCount + 1
        userMovieView.lastViewed  = new Date();
        return await  UserMovieViewModel.update(
            userMovieView, {
            where: {
                userId: userId,
                movieId: userId
            }
        })
    }else {
        return await UserMovieViewModel.create({
            userId: userId,
            movieId: userId,
            viewCount: 1
        })
    }
}

function omitHash(user) {
    const { password, ...userWithoutHash } = user;
    return userWithoutHash;
}

module.exports = {
    getUserByEmail,
    createUser,
    getUserById,
    authenticate,
    saveUserMovieView
}
const {
    Movies, UserMovieViewModel, sequelize
} = require('../sequelize')


async function getAllMovies(page, size) {
    let offset = (page -1) * size;
    return await Movies.findAll({offset ,size});
}

async function createMovie(params) {
   return await Movies.create({
        title: params.title,
        description: params.description,
        duration: params.duration,
        artist: params.artist,
        genres: params.genres,
        watchUrl: params.watchUrl
    });
}

async function getMovieById(id){
    return await Movies.findOne({ where: {
        id: id
    }});
}

async function updateMovie(id, params){
    return await Movies.update(
        params, {
        where: {
            id: id
        }
    })
}

async function getMostViewedMovie(){
    await UserMovieViewModel.findAll({
        attributes: [
            [db.sequelize.fn('sum', db.sequelize.col('view_count'), 'view_count')]
       ],
       group: ['movieId']
      });
}

module.exports = {
    getAllMovies,
    createMovie,
    getMovieById,
    updateMovie,
    getMostViewedMovie
}


const Sequelize = require('sequelize')
const moviesModel = require('./movies/Movies.model')
const userModel = require('./users/User.model')
const userMovieViewModel = require('./users/UserMovieView.model')
  const Migrator = require('./databaseMigrator');
let models = {}

const sequelize = new Sequelize("movies", "akhil", "admin", {
  host: "localhost",
  dialect: 'postgres',
  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const Movies = moviesModel(sequelize)
const Users = userModel(sequelize)
const UserMovieViewModel = userMovieViewModel(sequelize)
models = {
  Movies: Movies,
  Users: Users,
  UserMovieViewModel: UserMovieViewModel
}
Object.keys(models).forEach(function(modelName) {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});
const migrator = Migrator.migrate(sequelize)

module.exports = {
  Movies,
  Users,
  UserMovieViewModel,
  migrator
}

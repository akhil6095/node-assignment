const DataTypes = require("sequelize");

module.exports = function (sequelize) {
    const UserMovieView = sequelize.define('user_movie_view', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      movieId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      viewCount: {
        field : 'view_count',
        type: DataTypes.BIGINT(11),
        allowNull: true
      }, 
      lastViewed: {
        field : 'last_viewed',
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'user_movie_view',
      timestamps: false
    });
    return UserMovieView;
  };
  
'use strict';
const DataTypes = require("sequelize");
module.exports = {
  up: (queryInterface) => {
    return queryInterface.createTable('user_movie_view', {
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
    });
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('user_movie_view');
  }
};

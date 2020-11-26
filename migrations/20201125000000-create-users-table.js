'use strict';
const DataTypes = require("sequelize");
module.exports = {
  up: (queryInterface) => {
    return queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      lastName: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
      },
      roles: {
        type: DataTypes.ARRAY(DataTypes.STRING(16)),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false
      }
    });
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('users');
  }
};

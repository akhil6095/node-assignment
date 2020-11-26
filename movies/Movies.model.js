const DataTypes = require("sequelize");

module.exports = function (sequelize) {
    const Movies = sequelize.define('movies', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      duration: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      artist: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      genres: {
        type: DataTypes.ARRAY(DataTypes.STRING(16)),
        allowNull: false
      },
      watchUrl: {
        field: 'watch_url',
        type: DataTypes.STRING(255),
        allowNull: false
      },
      viewCount: {
        field : 'view_count',
        type: DataTypes.BIGINT(11),
        allowNull: true
      }
    }, {
      tableName: 'movies',
      timestamps: false
    });
  
    
    return Movies;
  
  };
  
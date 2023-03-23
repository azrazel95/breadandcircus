//declares the model utilizing sequelize, imports sequelize and the sequelize connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
//declaring the class extension, ratings currently are disabled
class Ratings extends Model { }
//declares the attributes of the model and the requirements for it, as well as any primary/foreign keys
Ratings.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    spring_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'spring', comment
        key: 'id'
      }
    },
    // comment_id: {
    //   type: DataTypes.INTEGER,
    //   references:{
    //     model: 'comment',
    //     key: 'id'
    //   }
    // },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    //model settings
    sequelize,
    timestamps: false,
    freezeTableName: false,
    underscored: true,
    modelName: 'rating',
    tableName: 'ratings'
  }
);

module.exports = Ratings;

// imports our model and datatypes from sequelize, plus sets up sequelize configs
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// sets up our comment model
class Comment extends Model { }

Comment.init(
  {
    // id autoincrements so we dont need to assign it or mess with it, its a primary key
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // description of comment
    description: {
      type: DataTypes.STRING,
    },
    // its defaultvalue takes care of assigning it a value
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // references user id for the user who created it
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    // references the post it belongs to
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;

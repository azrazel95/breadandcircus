// imports our model and datatypes from sequelize, plus sets up sequelize configs
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// sets up our comment model
class Post extends Model { }

Post.init(
  {
    // id autoincrements so we dont need to assign it or mess with it, its a primary key
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      onDelete: 'CASCADE'
    },
    // the name of the post
    post_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // the posts description
    description: {
      type: DataTypes.STRING,
    },
    // its defaultvalue takes care of assigning it a value
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // references the user who made the post
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    // sets up our sequelize settings
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;
//declares the model utilizing sequelize, imports sequelize and the sequelize connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
//declaring the class extension, comments currently disabled
class Comments extends Model { }
//declares the attributes of the model and the requirements for it, as well as any primary/foreign keys
Comments.init(
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
        model: 'users',
        key: 'id',
      }
    },
    spring_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'springs',
        key: 'id',
      }
    },
    //currently disabled
    // rating_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'rating',
    //     key: 'id'
    //   }

    // },
    comment: {
      type: DataTypes.STRING,
      primaryKey: true

    }
    //might be necessary to display comments
    // comment_id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true

    // }
  },
  {
    //model settings
    sequelize,
    timestamps: false,
    freezeTableName: false,
    underscored: true,
    modelName: 'comment',
    tableName: 'comments'
  }
);

module.exports = Comments;

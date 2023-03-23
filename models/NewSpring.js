//declares the model utilizing sequelize, imports sequelize and the sequelize connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
//declaring the class extension
class NewSpring extends Model { }
//declares the attributes of the model and the requirements for it, as well as any primary/foreign keys
NewSpring.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,

    },
    zipcode: {
      type: DataTypes.INTEGER(5),
    },
    pets: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    statepark: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    camping: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    //model settings
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'new_spring',
    tableName: 'new_spring'
  }
);

module.exports = NewSpring;

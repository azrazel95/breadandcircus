//declares the model utilizing sequelize, imports sequelize and the sequelize connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
//declaring the class extension
class Spring extends Model { }
//declares the attributes of the model and the requirements for it, as well as any primary/foreign keys
Spring.init(
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
    image_url: {
      type: DataTypes.TEXT,
    },
    zipcode: {
      type: DataTypes.INTEGER(5),
    },
    fees: {
      type: DataTypes.STRING(20),
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
    },
    scuba: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    lat: {
      type: DataTypes.DECIMAL(7, 4)
    },
    lng: {
      type: DataTypes.DECIMAL(7, 4)
    }
  },
  {
    //model settings
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'spring',
    tableName: 'springs'
  }
);

module.exports = Spring;

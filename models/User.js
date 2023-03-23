//declares the model utilizing sequelize, imports sequelize and the sequelize connection, as well as bcrypt for password encryption
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
//declaring the class extension as well as what to encrypt and check against the encryption
class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}
//declares the attributes of the model and the requirements for it, as well as any primary/foreign keys
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 250]
      },
    },
    permissions: {
      type: DataTypes.STRING,
      defaultValue: 'user'
    },
    customer_level: {
      type: DataTypes.STRING,
      defaultValue: 'silver'
    },
    zipcode: {
      type: DataTypes.INTEGER,
      validate: {
        len: [5]
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    //inserts hooks for the password encryption, hashing them
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    //model settings
    sequelize,
    timestamps: false,
    freezeTableName: false,
    underscored: true,
    modelName: 'user',
    tableName: 'users'
  }
);

module.exports = User;

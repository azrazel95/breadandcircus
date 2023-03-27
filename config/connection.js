// importing sequelize and our dotenv hidden keys
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;
//setting it up to work with jawsdb for heroku
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  //setting it up for our local host
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;

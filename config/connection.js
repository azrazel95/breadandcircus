//importing sequelize, utilizing the .env for login info
const Sequelize = require('sequelize');
require('dotenv').config();
//declaring sequelize
let sequelize;
//utilizing the jawsdb database, otherwise utilizing what is in the .env and connecting to mysql
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
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

//imports sequelize connection and its models
const sequelize = require('../config/connection');
const { User, Spring } = require('../models');
//imports userdata and springdata
const userData = require('./userData.json');
const springData = require('./springData.json');
//seeds tje datanase
const seedDatabase = async () => {
  await sequelize.sync({ force: true });
//users bulkcreate
  const users = await User.bulkCreate(userData,
    {
      individualHooks: true,
      returning: true,
    });
    //springs bulkcreate
  const springs = await Spring.bulkCreate(springData);

  for (const spring of springData) {
    await Spring.create({
      ...Spring,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
//finish
  process.exit(0);
};
//function execute
seedDatabase();

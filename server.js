//server variables
// let server = "http://localhost:3001";
let server = "https://breadandcircus.herokuapp.com";


// declaring our modules
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
// const helpers = require('./utils/helpers');
// cheeky cors
const cors = require('cors');
// setting up sequelize to connect using connection
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// using express.js to establish connections
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({});
// declaring our session attributes/settings
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: false,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
// telling express to use the sess session settings
app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// telling express what to use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// i know it doesnt look like much, but it helped us establish a connection when nothing else worked
//telling cors to accept any request coming from the server
app.use(cors({ origin: `${server}` }));
// telling express to utilized the routes folder to find pathing for the website
app.use(routes);


// asking sequelize to sync up
sequelize.sync({ force: false }).then(() => {
  // colourscheming the server log
  app.listen(PORT, () => console.log('\x1b[31m%s\x1b[0m', `${server}`));
});

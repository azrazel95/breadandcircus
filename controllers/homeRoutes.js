//imports express router, sequelize, the spring user newspring and disabled comments model, as well as the authorization
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Spring, User, NewSpring, Comments } = require('../models');
const withAuth = require('../utils/auth');
// finds springs, adds filtering functionality to homepage, renders homepage
router.get('/', async (req, res) => {
  try {
    let query = "";
    let i = 0;

    if (req.query.spvalue === "true") { i = i + 1; };
    if (req.params.petvalue === "true") { i = i + 1; };
    if (req.params.campingvalue === "true") { i = i + 1; };
    if (req.params.scubavalue === "true") { i = i + 1; };
    if (req.query.userfee === "true") { i = i + 1; };

    if (req.query.spvalue === "true") {
      query = `statepark = ${req.query.spvalue}`;
    };
    if (i > 1) {
      query = query + " AND ";
      i = i - 1;
    };
    if (req.query.petvalue === "true") {
      query = query + `pets = ${req.query.petvalue}`;
      if (i > 1) {
        query = query + " AND ";
        i = i - 1;
      };
    };
    if (req.query.campingvalue === "true") {
      query = query + `camping = ${req.query.campingvalue}`;
      if (i > 1) {
        query = query + " AND ";
        i = i - 1;
      };
    };
    if (req.query.scubavalue === "true") {
      query = query + `scuba = ${req.query.scubavalue}`;
      if (i > 1) {
        query = query + " AND ";
        i = i - 1;
      };
    };
    if (req.query.userfee === "true") {
      query = query + `fees = "free"`;
    };


    // Get all springs
    const springData = await Spring.findAll({
      where: sequelize.literal(`${query}`)

    });

    // Serialize data so the template can read it
    const springs = springData.map((spring) => {
      const plainspring = spring.get({ plain: true })
      plainspring.distance = 20;

      return plainspring;
    });

    // // Pass serialized data and session flag into template
    res.render('homepage', {
      springs

    });
  } catch (err) {
    console.log(err.message)
    res.status(500).json(err);
  }
});
//gets a specific spring site
router.get('/springs/:id', async (req, res) => {
  try {
    console.log('made it here')
    const springData = await Spring.findByPk(req.params.id, {
      // include: [
      //   {
      //     model: Comments, 
      //     attributes: [ 'comment'],
      //   }
      //   // {
      //   //   model: User,
      //   //   attributes: [ 'Name']
      //   // }
      // ]
    });

    const springs = springData.get({ plain: true });

    res.render('spring', { springs })
  } catch (err) {
    res.status(500).json(err);
  }
})



// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] }
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//finds the admin page if you have admin rights
router.get('/admin', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] }
    });
    const user = userData.get({ plain: true });
    if (user.permissions === "admin") {
      res.render('admin');
    } else { res.render('homepage') };
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/useradmin', withAuth, async (req, res) => {

//     // Find the logged in user based on the session ID
//     // const userData = await User.findByPk(req.session.user_id, {
//     //   attributes: { exclude: ['password'] }
//     // });
//     // const user = userData.get({ plain: true });

//     const userAll = await User.findAll();
//     const users = userAll.map((user) => {
//       const plainuser = user.get({ plain: true })
//     })

//     // if (user.permissions === "admin") {
//       res.render('useradmin', {
//         users
//       });
//     // } else {res.render('homepage')};

// });
//
// router.get('/springadmin', async (req, res) => {
//   const springData = await NewSpring.findAll({});
//   const springs = springData.map((spring) => {
//     const plainspring = spring.get({ plain: true })

//     return plainspring;
//   });
//   res.render('springadmin', {
//     springs
//   })
// });
//renders the login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

// Route to input a new spring which also renders any new spring added
router.get('/newspring', async (req, res) => {
  const springData = await NewSpring.findAll();
  const springs = springData.map((spring) => {
    const plainspring = spring.get({ plain: true })

    return plainspring;
  });
  res.render('newspring', {
    springs
  })
});

module.exports = router;

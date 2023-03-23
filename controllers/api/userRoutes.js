//imports express router and the user model
const router = require('express').Router();
const { User } = require('../../models');
//creates a user
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    console.log(req.body)
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      res.status(200).json(newUser);
    });
  } catch (err) {
    console.log(req.body)
    res.status(400).json(err);

  }
});
//logs in, saves user session
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});
//logs out
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
//currently disabled password reset functionality
router.post('/resetpassword', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    // if (!userData) {
    //   return res.status(400).json({ message: "User not found" });
    // }

    // // Verify old password before updating
    // const validPassword = await userData.checkPassword(req.body.oldPassword);
    // if (!validPassword) {
    //   return res.status(400).json({ message: "Invalid password" });
    // }

    // // Update password
    // userData.password = req.body.newPassword;
    // await userData.save();

    // req.session.save(() => {
    //   req.session.user_id = userData.id;
    //   req.session.logged_in = true;

    //     res.status(200).json({ message: "Password updated successfully" });
    //   });
  } catch (err) {
    res.status(400).json(err);
  }
});





module.exports = router;

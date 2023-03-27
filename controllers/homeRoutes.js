// importing our router, post user and comment models, and authentication
const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
// get request for the homepage
router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    // finds all posts with its associated user and comments (comments are unnecessary but im leaving it in for future development)
    const postData = await Post.findAll({
      include: [
        { model: User, attributes: ['name'] },
        { model: Comment, include: [{ model: User, attributes: ['name'] }] },
      ],
    });
    // Serializes the array so handlebars can use it
    const posts = postData.map((post) => post.get({ plain: true }));

    // passes posts and the fact we are logged in to handlebars, render homepage
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//get route for a post page for a specific post, found by id, with its associated user and comments
router.get('/posts/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['name'] },
        { model: Comment, include: [{ model: User, attributes: ['name'] }] },
      ],
    });
    // gets the data from the post
    const post = postData.get({ plain: true });
    // tells handlebars to render the post template using spread post, telling it that it is logged in
    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ensures authentication to access /profile
router.get('/profile', withAuth, async (req, res) => {
  try {
    // find the user that is currently logged in by id, to display his associated posts
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });
    // gets userdata
    const user = userData.get({ plain: true });
    // tells handlebars to erender profile with the spread user, telling profile that you are in fact logged in
    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// get request for the login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to dashboard
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;

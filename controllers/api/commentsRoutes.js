//importing router and the comments model, currently disabled
const router = require('express').Router();
const { Comments } = require('../../models');

// CREATE a new comment
router.post('/', async (req, res) => {
  try {
    const newComment = await Comments.create({
      user_id: req.session.user_id,
      spring_id: req.body.spring_id,
      comment: req.body.comment
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

//get all comments
router.get('/', async (req, res) => {
  try {
    const commentData = await Comments.findAll();
    // const comments = commentData.map((comment)=> {
    //   const plaincomments = comment.get({plain: true})

    res.status(200).json(commentData);
  }
  catch (err) {
    res.status(500).json(err)
  }
});

// GET all comments for a specific spring
router.get('/spring/:id', async (req, res) => {
  try {
    const commentData = await Comments.findAll({
      where: { spring_id: req.params.id }
    });
    const comments = commentData.map((comment) => {
      const plaincomment = comment.get({ plain: true })
      return plaincomment;
    })
    if (!commentData) {
      res.status(404).json({ message: 'no comments with this id!' });
      return;
    } else {

      res.status(200).json(comments);
    }
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
});


// create a middleware function to check if the user is an admin
const checkAdmin = (req, res, next) => {
  if (req.session.logged_in && req.session.user.permissions === 'admin') {
    // user is an admin, continue with the request
    next();
  } else {
    // user is not an admin, return an error
    res.status(401).json({ message: 'You are not authorized to perform this action.' });
  }
};

// add the middleware function to the delete route
router.delete('/:id', checkAdmin, async (req, res) => {
  try {
    const commentData = await Comments.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);

  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;

//importing our router, models and authentication
const router = require('express').Router();
const { Comment, User, Post } = require('../../models');
const withAuth = require('../../utils/auth');
//comment get request for all comments including user name and post name
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [
        { model: User, attributes: ['name'] },
        { model: Post, attributes: ['post_name'] }
      ]
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
})

//comment get request for a specific comment including user name and post name
router.get('/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['name'] },
        { model: Post, attributes: ['post_name'] }
      ]
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
})

//post request to create a comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete request for comment by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No Comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

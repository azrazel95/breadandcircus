const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) =>{
  try{
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ['name'] },
      { model: Comment, include: [{ model: User, attributes: ['name'] }] }],
    }); 
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
})



router.get('/:id', async (req, res) =>{
    try{
      const postData = await Post.findByPk(req.params.id, {
        include: [
          { model: User, attributes: ['name'] },
          { model: Comment, include: [{ model: User, attributes: ['name'] }] }
        ]
      });
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  })



router.post('/', withAuth, async (req, res) => {
  try {
    const newpost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newpost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No Post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
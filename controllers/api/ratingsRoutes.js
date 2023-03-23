//importing the ratings Model and the router. currently disabled
const router = require('express').Router();
const { Ratings } = require('../../models');

// GET all ratings for a given spring
router.get('/:spring_id', async (req, res) => {
  try {
    const ratingsData = await Ratings.findAll({
      where: {
        spring_id: req.params.spring_id
      }
    });
    res.status(200).json(ratingsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new rating for a spring
router.post('/', async (req, res) => {
  try {
    const newRating = await Ratings.create(req.body);
    res.status(200).json(newRating);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT update an existing rating
router.put('/:id', async (req, res) => {
  try {
    const updatedRating = await Ratings.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!updatedRating[0]) {
      res.status(404).json({ message: 'No rating found with this id!' });
      return;
    }
    res.status(200).json(updatedRating);
  } catch (err) {
    res.status(500).json(err);
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
    const deletedRating = await Ratings.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deletedRating) {
      res.status(404).json({ message: 'No rating found with this id!' });
      return;
    }
    res.status(204).end();

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

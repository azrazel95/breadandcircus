// importing router, springs and the disabled rating. authorization is currently disabled
const router = require('express').Router();
const { Spring, Ratings } = require('../../models');
const withAuth = require('../../utils/auth');
//find specific spring
router.get('/:id', async (req, res) => {
  try {
    const springData = await Spring.findByPk(req.params.id);
    if (!springData) {
      res.status(404).json({ message: 'no spring with this id!' });
      return;
    }
    res.status(200).json(springData);
  } catch (err) {
    res.status(500).json(err)
  }
});
//find all springs
router.get('/', async (req, res) => {
  try {
    const springData = await Spring.findAll();
    res.status(200).json(springData);
  } catch (err) {
    res.status(500).json(err)
  }
});
//filters said springs
router.get('/filtered/:spvalue/:petvalue/:campingvalue/:scubavalue/:userfee', async (req, res) => {
  if (req.params.spvalue === "true") {
    spvalue = true
  } else { spvalue = "" };
  if (req.params.petvalue === "true") {
    petvalue = true
  } else { petvalue = "" };
  if (req.params.campingvalue === "true") {
    campingvalue = true
  } else { campingvalue = "" };
  if (req.params.scubavalue === "true") {
    scubavalue = true
  } else { scubavalue = "" };
  if (req.params.userfee === "true") {
    feevalue = "free"
  } else { feevalue = "" };
  try {
    const springData = await Spring.findAll({

      where: {
        statepark: spvalue,
        pets: petvalue,
        camping: campingvalue,
        scuba: scubavalue,
        fees: feevalue
      },
    });
    if (!springData) {
      res.status(404).json({ message: 'your search did not match any filters!' });
      return;
    }
    const springs = springData.map((spring) => {
      const plainspring = spring.get({ plain: true })
    });
    res.render('homepage', { springs });

    // res.status(200).json(springData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

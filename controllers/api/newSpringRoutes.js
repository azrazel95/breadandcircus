//utilizing the spring model, importing router and our authorization, not currently utilized
const router = require('express').Router();
const { NewSpring } = require('../../models');
const withAuth = require('../../utils/auth');
//returning the new spring to display
router.get('/:id', async (req, res) => {
    try {
        const springData = await NewSpring.findByPk(req.params.id);
        if (!springData) {
            res.status(404).json({ message: 'no spring with this id!' });
            return;
        }
        res.status(200).json(springData);
    } catch (err) {
        res.status(500).json(err)
    }
});
//get all new springs
router.get('/', async (req, res) => {
    try {
        const springData = await NewSpring.findAll();
        res.status(200).json(springData);
    } catch (err) {
        res.status(500).json(err)
    }
});
//creating a new spring
router.post('/', async (req, res) => {
    NewSpring.create(req.body)
        .then((newNewSpring) => {
            res.status(200).json(newNewSpring);
        })
        .catch((err) => {
            res.status(200).json(err);
        })
});

module.exports = router;

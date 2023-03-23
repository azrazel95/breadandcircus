//index file declares routes from the /api/ down
//finding the modules
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const springRoutes = require('./springRoutes');
const newSpringRoutes = require('./newSpringRoutes');
// const ratingsRoutes = require('./ratingsRoutes')
const commentsroutes = require('./commentsRoutes')
//declarations
router.use('/users', userRoutes);
router.use('/springs', springRoutes);
router.use('/newspring', newSpringRoutes);
router.use('/comments', commentsroutes)

module.exports = router;

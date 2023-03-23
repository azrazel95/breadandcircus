//imports the express router
const router = require('express').Router();
//imports the route modules
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
//declares the routes
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;

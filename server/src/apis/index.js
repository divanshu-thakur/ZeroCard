
const router = require('express').Router();

// all api routes
router.use('/journey', require('./journey'));

module.exports = router;

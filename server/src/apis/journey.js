
const router = require('express').Router();
const { asyncExecute } = require('../middlewares');
const controller = require('../components/journey/controller');

router.post('/create', asyncExecute(controller.createJourney));

router.get('/summary/collection', asyncExecute(controller.collectionSummary));
router.get('/summary/passenger', asyncExecute(controller.passengerSummary));

module.exports = router;

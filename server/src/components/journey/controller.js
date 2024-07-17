
const { validateRequest } = require('../../middlewares');
const validator = require('./validator');
const service = require('./service');
const { RESPONSE_STATUS } = require('../../constants/status');

let createJourney = async (request, response) => {
    validateRequest(request, validator.createJourney);

    await service.createJourney(request.body);

    response.json({
        status: RESPONSE_STATUS.SUCCESS,
    });
};

let collectionSummary = async (request, response) => {
    let collectionSummary = await service.collectionSummary();

    response.json({
        status: RESPONSE_STATUS.SUCCESS,
        collectionSummary,
    });
};

let passengerSummary = async (request, response) => {
    let passengerSummary = await service.passengerSummary();

    response.json({
        status: RESPONSE_STATUS.SUCCESS,
        passengerSummary,
    });
};

module.exports = {
    createJourney,
    collectionSummary,
    passengerSummary,
};

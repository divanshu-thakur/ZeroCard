
const Joi = require('joi');
const constant = require('./constant');

const createJourney = {
    body: Joi.object().keys({
        zeroCardId: Joi.string().required(),
        startStation: Joi.number().valid(constant.STATION.AIRPORT, constant.STATION.NEW_DELHI).required(),
        endStation: Joi.number().valid(constant.STATION.AIRPORT, constant.STATION.NEW_DELHI).required(),
    }).custom((value, helpers) => {
        if (value.startStation === value.endStation) {
            return helpers.message('Start Station and End Station must not be same');
        }
        return value;
    }),
};

module.exports = {
    createJourney,
};

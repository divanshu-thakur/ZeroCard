
const DAL = require('./DAL');
const constant = require('./constant');
const AppError = require('../../utils/appError');
const { ERROR_CODES } = require('../../constants/error');
const passengerDAL = require('../passenger/DAL');
const passengerConstant = require('../passenger/constant');

let createJourney = async (data) => {
    let passenger = await passengerDAL.findByZeroCardId(data.zeroCardID);
    if (!passenger) throw new AppError(ERROR_CODES.INVALID_ZEROCARDID);

    let fare = 0, passengerType;
    if (passenger.age <= passengerConstant.AGE_CONSTRAINTS.MAX_AGE_FOR_KID) {
        fare = constant.FARE.KIDS;
        passengerType = passengerConstant.PASSENGER_TYPE.KIDS;
    } else if (passenger.age >= passengerConstant.AGE_CONSTRAINTS.MIN_AGE_FOR_SENIOR_CITIZEN) {
        fare = constant.FARE.SENIOR_CITIZENS;
        passengerType = passengerConstant.PASSENGER_TYPE.SENIOR_CITIZENS;
    } else {
        fare = constant.FARE.ADULTS;
        passengerType = passengerConstant.PASSENGER_TYPE.ADULTS;
    }

    let lastJourney = await DAL.findLastJourneyByPassengerId(passenger._id);
    if (lastJourney && lastJourney.endStation === data.startStation && (new Date() - lastJourney.createdAt) < 24 * 60 * 60 * 1000) {
        fare = (fare * constant.DISCOUNT_PERCENTAGE) / 100;
    }

    let createJourneyObj = {
        passengerId: passenger._id,
        passengerType,
        startStation: data.startStation,
        endStation: data.endStation,
        fare,
    };

    await DAL.createJourney(createJourneyObj);
    return;
};

let collectionSummary = async () => {
    let summary = await DAL.calculateCollectionSummary();

    return summary;
};

let passengerSummary = async () => {
    let summary = await DAL.calculatePassengerSummary();

    return summary;
};

module.exports = {
    createJourney,
    collectionSummary,
    passengerSummary,
};

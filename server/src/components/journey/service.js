
const DAL = require('./DAL');
const constant = require('./constant');
const AppError = require('../../utils/appError');
const { ERROR_CODES } = require('../../constants/error');
const passengerDAL = require('../passenger/DAL');
const passengerConstant = require('../passenger/constant');

let createJourney = async (data) => {
    let passenger = await passengerDAL.findByZeroCardId(data.zeroCardId);
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

    const stations = { ...constant.STATION }
    for (let station in stations) {
        let elem = summary.find(item => item.station === stations[station]);

        if (!elem) {
            summary.push({
                station: stations[station],
                totalCollection: 0,
                totalDiscount: 0,
            });
        }
    }
    return summary;
};

let passengerSummary = async () => {
    let summary = await DAL.calculatePassengerSummary();

    const passengerTypes = { ...passengerConstant.PASSENGER_TYPE }
    for (let passengerType in passengerTypes) {
        let elem = summary.find(item => item.passengerType === passengerTypes[passengerType]);

        if (!elem) {
            summary.push({
                count: 0,
                passengerType: passengerTypes[passengerType],
            });
        }
    }
    return summary;
};

module.exports = {
    createJourney,
    collectionSummary,
    passengerSummary,
};

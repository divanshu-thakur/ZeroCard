
'use strict';

const MONGOOSE = require('mongoose');
const SCHEMA = MONGOOSE.Schema;
const { STATION } = require('./constant');
const { PASSENGER_TYPE } = require('../passenger/constant');

const allowedTypeValues = [PASSENGER_TYPE.ADULTS, PASSENGER_TYPE.KIDS, PASSENGER_TYPE.SENIOR_CITIZENS];
const allowedStationValues = [STATION.NEW_DELHI, STATION.AIRPORT];

let journeySchema = new SCHEMA(
    {
        passengerId: {
            type: SCHEMA.Types.ObjectId,
            required: true,
        },
        passengerType: {
            type: Number,
            required: true,
            validate: {
                validator: function (value) {
                    return allowedTypeValues.includes(value);
                },
                message: props => `${props.value} is not a valid value! Allowed values are: ${allowedTypeValues.join(', ')}`
            }
        },
        startStation: {
            type: Number,
            required: true,
            validate: {
                validator: function (value) {
                    return allowedStationValues.includes(value);
                },
                message: props => `${props.value} is not a valid value! Allowed values are: ${allowedStationValues.join(', ')}`
            }
        },
        endStation: {
            type: Number,
            required: true,
            validate: {
                validator: function (value) {
                    return allowedStationValues.includes(value);
                },
                message: props => `${props.value} is not a valid value! Allowed values are: ${allowedStationValues.join(', ')}`
            }
        },
        fare: {
            type: Number,
            required: true,
        }
    },
    { timestamps: true }
);

let modelJourney = MONGOOSE.model('journey', journeySchema);

module.exports = modelJourney;

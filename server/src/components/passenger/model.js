
'use strict';

const MONGOOSE = require('mongoose');
const SCHEMA = MONGOOSE.Schema;
const { AGE_CONSTRAINTS } = require('./constant');

let passengerSchema = new SCHEMA(
    {
        zeroCardId: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        age: {
            type: Number,
            required: true,
            validate: {
                validator: function (value) {
                    return value >= AGE_CONSTRAINTS.MIN_AGE_FOR_ZERO_CARD;
                },
                message: props => `${props.value} is not a valid age! Minimum age to use Zero Card is ${AGE_CONSTRAINTS.MIN_AGE_FOR_ZERO_CARD}`
            }
        }
    },
    { timestamps: true }
);

let modelPassenger = MONGOOSE.model('passenger', passengerSchema);

module.exports = modelPassenger;

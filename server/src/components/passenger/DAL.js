
const model = require('./model');

let createPassenger = (data) => {
    return new model(data).save();
};

let findByZeroCardId = (zeroCardId) => {
    return model.findOne({ zeroCardId });
};

module.exports = {
    createPassenger,
    findByZeroCardId,
};

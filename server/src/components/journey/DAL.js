
const model = require('./model');

let createJourney = (data) => {
    return new model(data).save();
};

let findLastJourneyByPassengerId = (passengerId) => {
    return model.findOne({ passengerId }).sort({ travelDate: -1 });
};

let calculateCollectionSummary = () => {
    return model.aggregate([
        {
            $group: {
                _id: '$startStation',
                totalCollection: { $sum: '$fare' },
                totalDiscount: { $sum: { $cond: [{ $nin: ['$fare', [20, 30, 100]] }, '$fare', 0] } }, // Adjusted the condition for discount
            }
        },
        {
            $project: {
                _id: 0,
                station: '$_id',
                totalCollection: 1,
                totalDiscount: 1
            }
        }
    ]);
};

let calculatePassengerSummary = () => {
    return model.aggregate([
        {
            $group: {
                _id: "$passengerType",
                count: { $sum: 1 }
            }
        },
        {
            $sort: { count: -1, passengerType: 1 }
        },
        {
            $project: {
                _id: 0,
                passengerType: '$_id',
                count: 1,
            }
        }
    ]);
};

module.exports = {
    createJourney,
    findLastJourneyByPassengerId,
    calculateCollectionSummary,
    calculatePassengerSummary,
};

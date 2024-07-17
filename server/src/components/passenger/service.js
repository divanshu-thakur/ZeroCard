
const DAL = require('./DAL');

let createDummyPassengers = async () => {
    let passengers = [
        { zeroCardId: '0001', name: 'Amit Sharma', age: 34 },
        { zeroCardId: '0002', name: 'Priya Singh', age: 29 },
        { zeroCardId: '0003', name: 'Rohan Kumar', age: 8 },
        { zeroCardId: '0004', name: 'Sunita Devi', age: 70 },
        { zeroCardId: '0005', name: 'Vikram Rao', age: 11 },
        { zeroCardId: '0006', name: 'Anjali Mehta', age: 62 },
    ];

    for (let passengerData of passengers) {
        let duplicatePassengerObj = await DAL.findByZeroCardId(passengerData.zeroCardId);
        if (duplicatePassengerObj) break;

        await DAL.createPassenger(passengerData);
    }
};

module.exports = {
    createDummyPassengers,
};


'use strict';

// import modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passengerService = require('./components/passenger/service');

const MONGO_URI = 'mongodb://localhost:27017/ZeroCard';
const SERVER_PORT = 8080;

// app
const app = express();

// db
mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connection established');
    passengerService.createDummyPassengers()
        .then(() => console.log('Dummy passengers created'))
        .catch((err) => console.log('Error during dummy data creation: ', err));
}).catch((error) => console.log('Connection error: ', error));

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* using cors for enabling cross-origin requests */
app.use(
    cors({
        origin: '*',
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

app.options('*', cors());

/* adding response headers */
app.all('', function (req, res, next) {
    // jshint ignore:line
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    next();
});

// routes
app.use(`/api`, require('./apis'));

// listener
const server = app.listen(SERVER_PORT, () =>
    console.log(`Server is running on port ${SERVER_PORT}`)
);


const ERROR_CODES = {
    REQUEST_BODY_INVALID: -10100,
    REQUEST_QUERY_INVALID: -10101,
    REQUEST_PARAMS_INVALID: -10102,

    // passenger error codes
    ZEROCARDID_ALREADY_EXISTS: -30100,
    INVALID_ZEROCARDID: -30101,
};

const ERROR_INFO = {
    [ERROR_CODES.REQUEST_BODY_INVALID]: 'Invalid body in request',
    [ERROR_CODES.REQUEST_QUERY_INVALID]: 'Invalid query in request',
    [ERROR_CODES.REQUEST_PARAMS_INVALID]: 'Invalid params in API route',

    // passenger error info
    [ERROR_CODES.ZEROCARDID_ALREADY_EXISTS]: 'A passenger is already registered for the given Zero Card ID',
    [ERROR_CODES.INVALID_ZEROCARDID]: 'Invalid Zero Card ID',
};

module.exports = {
    ERROR_CODES,
    ERROR_INFO,
};

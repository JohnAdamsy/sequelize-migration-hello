'use strict';

/**
 * Load Module dependencies.
 */
const path = require('path');

const env = process.env;

const PORT      = env.PORT || 9333;
const API_URL   = env.API_URL || 'http://127.0.0.1:9333';
const NODE_ENV  = env.NODE_ENV || 'development';
const HOST      = env.HOST_IP || 'localhost';
let config = {

    // Root Configs
    API_URL: API_URL,

    ENV: NODE_ENV,

    PORT: PORT,

    HOST: HOST
};

module.exports = config;
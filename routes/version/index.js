'use strict';
const APP_VERSION = require('../../package.json').version;
const NODE_ENV = process.env.NODE_ENV || '';

module.exports = function(router) {
    router.get('/', (_, res) => res.json({version: APP_VERSION}));
    router.get('/environment', (_, res) => res.json({NODE_ENV: NODE_ENV}));
};

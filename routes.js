'use strict';
const Promise = require('bluebird');
const glob = require('glob-promise');
const path = require('path');
const expressRouter = require('express-promise-router');

module.exports = {
    registerRoutes: function (app) {
        return Promise.map(glob('./routes/**/index.js'), function (routePath) {
            const routeBase = path.dirname(path.posix.relative('./routes', routePath));
            const router = expressRouter();
            return Promise.resolve(require(routePath)(router)).then(function (/*data*/) {
                // `data` is resolved at this point, even if a Promise
                if (!global.isTesting) {
                    console.log(`Registered route '/${routeBase}'`);
                }
                app.use(`/${routeBase}`, router);
            });
        });
    },
};

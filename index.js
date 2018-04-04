const port = process.env.PORT || 8080;

global.isTesting = process.env.NODE_ENV === 'testing';
global.isLocalDev = process.env.NODE_ENV === 'localdev';

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const handlebars = require('express-handlebars');

const routes = require('./routes');

const app = express();

if (!global.isLocalDev) {
    app.enable('view cache');
}
if (!global.isTesting) {
    app.use(morgan('dev'));
}

app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    helpers: {},
}));

function missingRouteHandler(req, res) {
    return res.status(400).render('error/404');
}

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
    // Promise rejections will also get handled here
    console.error(error.message);
    console.error(error.stack);
    if (!global.isLocalDev) {
        delete error.stack;
    }
    return res.status(500).render('error/500', {error: error});
}

app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    helpers: {},
}));


const serverStart = routes.registerRoutes(app).then(r => {
    if (!global.isTesting) {
        console.log(`Finished registered ${r.length} routes`);
    }

    app.use('/', express.static('./client/build'));

    app.use(missingRouteHandler);
    app.use(errorHandler);
}).catch(err => {
    console.error(err.message);
    console.error(err.stack);
    console.error('\n', err);
});

app.listen(port, () => {
    if (!global.isTesting) {
        console.log(`Listening on port ${port}`);
    }
});

module.exports = {
    app,
    serverStart
};

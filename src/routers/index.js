const homeRouter = require('./home');

const routers = (app) => {
    app.use('/', homeRouter);
};

module.exports = routers;

const homeRouter = require('./home');
const courseRouter = require('./course');
const meRouter = require('./me');

const routers = (app) => {
    app.use('/course', courseRouter);
    app.use('/me', meRouter);
    app.use('/', homeRouter);
};

module.exports = routers;

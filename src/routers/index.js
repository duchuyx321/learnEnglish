const homeRouter = require('./home');
const courseRouter = require('./course');
const meRouter = require('./me');
const authRouter = require('./auth');
const lessonRouter = require('./lesson');
const contentRouter = require('./content');

const routers = (app) => {
    app.use('/course', courseRouter);
    app.use('/me', meRouter);
    app.use('/auth', authRouter);
    app.use('/lesson', lessonRouter);
    app.use('/content', contentRouter);
    app.use('/', homeRouter);
};

module.exports = routers;

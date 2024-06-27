const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars').engine;
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

const routes = require('./routers');
const db = require('./config/db');

const app = express();
const port = 5000;
// databases
db.connect();
// method overrides
app.use(methodOverride('_method'));
// cookie
app.use(cookieParser()); // cung cấp các thứ về cookie
// file tĩnh
app.use(express.static(path.join(__dirname, 'public')));

// morgan
app.use(morgan('combined'));

// nhận dữ liệu trả về

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// handlebars

app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// routers
routes(app);

app.listen(port, () => {
    console.log('server listening at http://localhost:' + port);
});

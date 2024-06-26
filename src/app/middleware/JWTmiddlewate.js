const JWT = require('jsonwebtoken');
require('dotenv').config();

const veryToken = (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        JWT.verify(token, process.env.JWTKEY, (err, user) => {
            if (err) {
                res.json({ message: 'token not valid' });
            }
            res.user = user;
            next(err);
        });
    }
    res.json({ message: 'you are not allowed to' });
};

module.exports = { veryToken };

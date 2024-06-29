const CheckCookie = (req, res, next) => {
    if (req.cookies && req.cookies.refreshToken) {
        res.locals.isCookie = true;
    } else {
        res.locals.isCookie = false;
    }
    next();
};

module.exports = CheckCookie;
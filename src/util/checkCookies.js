const CheckCookie = (req, res, next) => {
    if (req.cookies && req.cookies.refreshToken) {
        res.locals.isCookie = true;
    } else {
        res.locals.isCookie = false;
    }
    next();
};
const AlertCookie = (req, res, next) => {
    if (req.cookies && req.cookies.refreshToken) {
        next();
    } else {
        res.status(300).json({ message: 'Vui lòng đăng nhập' });
    }
};
module.exports = { CheckCookie, AlertCookie };

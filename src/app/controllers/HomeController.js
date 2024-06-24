class HomeController {
    // [GET] --- /
    async index(req, res, next) {
        try {
            res.render('home');
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new HomeController();

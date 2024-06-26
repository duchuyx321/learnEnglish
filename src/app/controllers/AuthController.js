const bcrypt = require('bcryptjs');
const User = require('../module/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
class AuthController {
    // [POST] --/auth/register
    async register(req, res, next) {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            req.body.password = hash;
            const user = new User(req.body);
            await user.save();
            const { passwords, ...users } = user;
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    // [POST] --/auth/login
    async login(req, res, next) {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                res.status(404).json({ message: 'wrong username' });
                return;
            }
            const hashPassword = await bcrypt.compare(
                req.body.password,
                user.password,
            );
            if (!hashPassword) {
                res.status(404).json({ message: 'wrong password' });
                return;
            }
            const token = jwt.sign(
                { id: user.id, admin: user.admin },
                process.env.JWTKEY,
                {
                    expiresIn: '1h',
                },
            );
            const { password, ...others } = user._doc;
            res.json({ ...others, token });
        } catch (err) {
            res.status(404).json({ message: err.message, next: next });
        }
    }
}

module.exports = new AuthController();

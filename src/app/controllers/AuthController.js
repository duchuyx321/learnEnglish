const bcrypt = require('bcryptjs');
const User = require('../module/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { AccessToken, RefreshToken } = require('../../util/JwTToken');
const { response } = require('express');
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
            res.status(500).json({ message: err.message, next });
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
            const accessToken = AccessToken(user);
            const refreshToken = RefreshToken(user);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true, // chỉ có máy chủ mớ truy cập
                secure: true,
                path: '/',
                sameSite: 'strict', // cho phép gửi gì đó lên
            });
            const { password, ...others } = user._doc;
            res.redirect("/");
            // res.json({ ...others, accessToken });
        } catch (err) {
            res.status(404).json({ message: err.message, next: next });
        }
    }

    // [POST] --/auth/refresh
    async refresh(req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                return res.json({ message: "you'are not acc" });
            }
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
                if (err) {
                    response.json({ message: err });
                }
                const newAccessToken = AccessToken(user);
                const newRefreshToken = RefreshToken(user);
                res.cookie('refreshToken', newRefreshToken, {
                    httpOnly: true, // chỉ có máy chủ mớ truy cập
                    secure: true,
                    path: '/',
                    sameSite: 'strict', // cho phép gửi gì đó lên
                });

                res.json({ accessToken: newAccessToken }); //accessToken: newAccessToken
            });
        } catch (err) {
            res.status(404).json({ message: err.message, next: next });
        }
    }

    // [POST] --/auth/logout
    async logout(req, res, next) {
        try {
            await res.clearCookie('refreshToken');
            res.status(200).json({ message: 'logout successful' });
        } catch (err) {
            res.json({ message: err.message, next });
        }
    }

    // [GET] --/auth/post
    async post(req, res, next) {
        try {
            res.render('fromLogin/FormLogin');
        } catch (err) {
            res.status(500).send({ message: err.message, next });
        }
    }
}

module.exports = new AuthController();

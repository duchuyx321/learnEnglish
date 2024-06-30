const express = require('express');
const Contents = require('../module/Content');

class contentController {
    // [POST] ---/content/create
    async create(req, res, next) {
        try {
            const contents = new Contents(req.body);
            await contents.save();

            res.status(200).json(contents);
        } catch (err) {
            res.status(500).json({ message: err.message, next });
        }
    }
}

module.exports = new contentController();

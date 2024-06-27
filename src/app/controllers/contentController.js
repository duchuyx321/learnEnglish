const express = require('express');
const Content = require('../module/Content');

class contentController {
    // [POST] ---/content/create
    async create(req, res, next) {
        try {
            const content = await new Content(req.body);
            await content.save();

            res.status(200).json(content);
        } catch (err) {
            res.status(500).json({ message: err.message, next });
        }
    }
}

module.exports = new contentController();

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 6,
            maxlength: 15,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            minlength: 10,
            maxlength: 50,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        admin: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', User);

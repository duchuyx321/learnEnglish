const mongoose = require('mongoose');
const { Schema } = mongoose;
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const sequence = require('mongoose-sequence');

const Content = new Schema(
    {
        id_Lesson: { type: Number, required },
        content: [
            {
                id_content: { type: Number, required },
                wordVN: { type: String, required },
                wordENG: { type: String, required },
            },
        ],
    },
    {
        timestamps: true,
    },
);

// plugins
mongoose.plugin(slug);
mongoose.plugin(sequence, { inc_field: 'id_content' });
mongoose.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: true,
});

module.exports = Content;

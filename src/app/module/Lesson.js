const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const sequence = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;
const Lesson = new Schema(
    {
        id: { type: Number },
        name: { type: String },
        description: { type: String },
        contents: [
            {
                title: { type: String },
                body: { type: String },
            },
        ],
    },

    {
        timestamps: true,
    },
);

// plugins
mongoose.plugin(slug);
Lesson.plugin(sequence, { inc_field: 'id' });
mongoose.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: true,
});

module.exports = mongoose.model('Lesson', Lesson);

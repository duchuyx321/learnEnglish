const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const sequence = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;
const Lesson = new Schema(
    {
        lessons: [
            {
                id: { type: Number },
                name: { type: String },
                description: { type: String },
                content: [
                    {
                        id_Lesson: { type: Number },
                        title: { type: String },
                        body: { type: String },
                    },
                ],
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
Lesson.plugin(sequence, { inc_field: 'id_Lesson' });
mongoose.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: true,
});

module.exports = mongoose.model('Lesson', Lesson);

const mongoose = require('mongoose');
const { Schema } = mongoose;
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const sequence = require('mongoose-sequence')(mongoose);

const lessons = new Schema(
    {
        id_course: { type: Number, required, unique },
        lessons: [
            {
                id: { type: Number, required },
                name: { type: String, required },
                description: { type: String },
                content: [
                    {
                        id_Lesson: { type: Number, required },
                        name: { type: String, required },
                        description: { type: String },
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
mongoose.plugin(sequence, { inc_field: 'id' });
mongoose.plugin(sequence, { inc_field: 'id_Lesson' });
mongoose.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: true,
});

module.exports = lessons;

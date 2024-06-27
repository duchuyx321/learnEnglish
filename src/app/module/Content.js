const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const sequence = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Content = new Schema(
    {
        id_content: { type: Number },
        content: [
            {
                id_: { type: Number },
                vocabulary: { type: String },
                vietnamese: { type: String },
            },
        ],
    },
    {
        timestamps: true,
    },
);
// plugins
mongoose.plugin(slug);
Content.plugin(sequence, { inc_field: 'id_content' });
Content.plugin(sequence, { inc_field: 'id_' });
mongoose.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: true,
});

module.exports = mongoose.model('Content', Content);

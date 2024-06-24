const mongoose = require('mongoose');
const { schema } = mongoose.Schema;
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const sequence = require('mongoose-sequence')(mongoose);

const Courses = new schema(
    {
        _id: { type: Number, required, unique },
        name: { type: String, required },
        description: { type: String, default: '' },
        image: { type: String, required },
    },
    {
        _id: false,
        timestamps: true,
    },
);

mongoose.plugin(slug);
mongoose.plugin(sequence);
mongoose.plugin(mongooseDelete, {
    deleteAt: true, // time delete
    overrideMethods: true, // override methods(ghi đè lên các phương thức cũ )
});

module.exports = Courses;

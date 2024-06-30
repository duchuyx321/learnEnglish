const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const sequence = require('mongoose-sequence')(mongoose);

const schema = mongoose.Schema;

const Courses = new schema(
    {
        _id: { type: Number },
        name: { type: String },
        description: { type: String, default: '' },
        image: { type: String },
        slug: { type: String, slug: 'name' },
        id_Teacher: { type: String, default: 'admin' },
        follow: { type: Boolean, default: false },
    },
    {
        _id: false,
        timestamps: true,
    },
);
// plugins
mongoose.plugin(slug);
Courses.plugin(sequence);
mongoose.plugin(mongooseDelete, {
    deleteAt: true, // time delete
    overrideMethods: true, // override methods(ghi đè lên các phương thức cũ )
});

module.exports = mongoose.model('Courses', Courses);

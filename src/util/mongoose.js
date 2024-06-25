module.exports = {
    multipliedMongooseToObject: (mongoose) =>
        mongoose.map((course) => course.toObject()),
    mongooseToObject: (mongoose) => (mongoose ? mongoose.toObject() : mongoose),
};

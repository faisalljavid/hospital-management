const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    speciality: {
        type: [String],
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    details: {
        description: String,
        images: [String],
        numberOfDoctors: Number,
        numberOfDepartments: Number
    }
}, { timestamps: true });

module.exports = mongoose.model('Hospital', hospitalSchema);
const Hospital = require('../models/Hospital');

exports.createHospital = async (hospitalData) => {
    return await Hospital.create(hospitalData);
};

exports.getHospitalsByCity = async (city) => {
    return await Hospital.find({ city: new RegExp(city, 'i') });
};

exports.deleteHospital = async (id) => {
    const hospital = await Hospital.findByIdAndDelete(id);
    if (!hospital) {
        throw new Error('Hospital not found');
    }
    return hospital;
};

exports.updateHospital = async (id, updateData) => {
    const hospital = await Hospital.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true
    });

    if (!hospital) {
        throw new Error('Hospital not found');
    }

    return hospital;
};

exports.addHospitalDetails = async (id, detailsData) => {
    const hospital = await Hospital.findByIdAndUpdate(
        id,
        { details: detailsData },
        { new: true, runValidators: true }
    );

    if (!hospital) {
        throw new Error('Hospital not found');
    }

    return hospital;
};
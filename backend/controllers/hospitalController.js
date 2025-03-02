const hospitalService = require('../services/hospitalService');

exports.createHospital = async (req, res) => {
    try {
        const hospital = await hospitalService.createHospital(req.body);
        res.status(201).json({ success: true, data: hospital });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getHospitalsByCity = async (req, res) => {
    try {
        const { city } = req.query;
        const hospitals = await hospitalService.getHospitalsByCity(city);
        res.status(200).json({ success: true, data: hospitals });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.deleteHospital = async (req, res) => {
    try {
        const { id } = req.query;
        await hospitalService.deleteHospital(id);
        res.status(200).json({ success: true, message: 'Hospital deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.updateHospital = async (req, res) => {
    try {
        const { id } = req.query;
        const hospital = await hospitalService.updateHospital(id, req.body);
        res.status(200).json({ success: true, data: hospital });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.addHospitalDetails = async (req, res) => {
    try {
        const { id } = req.query;
        const hospital = await hospitalService.addHospitalDetails(id, req.body);
        res.status(200).json({ success: true, data: hospital });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
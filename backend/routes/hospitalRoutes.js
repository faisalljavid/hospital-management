const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');

router.post('/api/v1/hospitals/create', hospitalController.createHospital);
router.get('/api/v1/hospitals', hospitalController.getHospitalsByCity);
router.delete('/api/v1/hospitals/delete', hospitalController.deleteHospital);
router.put('/api/v1/hospitals/update', hospitalController.updateHospital);
router.post('/api/v1/hospitals/details', hospitalController.addHospitalDetails);

module.exports = router;
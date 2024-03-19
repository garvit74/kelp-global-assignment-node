const express = require('express');
const router = express.Router();
const { uploadCSVData } = require('../controllers/csvController');

router.get('/upload-csv', uploadCSVData);

module.exports = router;

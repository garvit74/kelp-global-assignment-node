// routes/csvRoutes.js
const express = require('express');
const router = express.Router();
const csvController = require('../controllers/csvController.js');
// const csvMiddleware = require('../middlewares/csvMiddleware');
const multer = require('multer');

// Multer configuration for handling file uploads
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('csvFile'), csvController.uploadCSV);
router.get('/age-distribution', csvController.calculateAgeDistribution);

module.exports = router;

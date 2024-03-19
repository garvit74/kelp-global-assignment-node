// controllers/csvController.js
const csvService = require('../services/csvService');

exports.uploadCSV = async (req, res) => {
    try {
        // Process CSV file and upload to database
        const result = await csvService.uploadCSV(req.file.path);
        res.json({ message: 'CSV file uploaded successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.calculateAgeDistribution = async (req, res) => {
    try {
        // Calculate age distribution
        const distribution = await csvService.calculateAgeDistribution();
        res.json({ ageDistribution: distribution });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

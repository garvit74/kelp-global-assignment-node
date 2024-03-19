// services/csvService.js
const csvParser = require('../utils/csvParser');
const csvDataModel = require('../models/csvData');

exports.uploadCSV = async (filePath) => {
    // Parse CSV file
    const jsonData = await csvParser.parse(filePath);

    // Save data to database
    const result = await csvDataModel.create(jsonData);

    return result;
};

exports.calculateAgeDistribution = async () => {
    try {
        // Assuming you have a function to retrieve age data from the database
        const ageData = await getAgeDataFromDatabase();

        // Initialize variables to store counts for each age group
        let countLessThan20 = 0;
        let count20To40 = 0;
        let count40To60 = 0;
        let countGreaterThan60 = 0;

        // Loop through age data to count users in each age group
        ageData.forEach(user => {
            if (user.age < 20) {
                countLessThan20++;
            } else if (user.age >= 20 && user.age <= 40) {
                count20To40++;
            } else if (user.age > 40 && user.age <= 60) {
                count40To60++;
            } else {
                countGreaterThan60++;
            }
        });

        // Calculate total number of users
        const totalUsers = ageData.length;

        // Calculate percentage distribution
        const percentageLessThan20 = (countLessThan20 / totalUsers) * 100;
        const percentage20To40 = (count20To40 / totalUsers) * 100;
        const percentage40To60 = (count40To60 / totalUsers) * 100;
        const percentageGreaterThan60 = (countGreaterThan60 / totalUsers) * 100;

        // Construct the age distribution object
        const ageDistribution = {
            '< 20': percentageLessThan20,
            '20 to 40': percentage20To40,
            '40 to 60': percentage40To60,
            '> 60': percentageGreaterThan60
        };

        return ageDistribution;
    } catch (error) {
        throw new Error('Failed to calculate age distribution');
    }
};
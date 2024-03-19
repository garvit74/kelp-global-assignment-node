const { pool } = require('../utils/dbConfig');
const { parseCSV } = require('../utils/csvParser');
const { types } = require('pg');
const config = require('../config');

// Correctly parse numeric types from PostgreSQL
types.setTypeParser(types.builtins.NUMERIC, parseFloat);

async function printAgeDistribution() {
    try {
        const query = `
            SELECT 
              CASE 
                WHEN age IS NULL THEN 'Unknown'
                WHEN age < 20 THEN '< 20'
                WHEN age BETWEEN 20 AND 40 THEN '20 to 40'
                WHEN age BETWEEN 40 AND 60 THEN '40 to 60'
                WHEN age > 60 THEN '> 60'
              END as age_group,
              COUNT(*) * 100.0 / (SELECT COUNT(*) FROM csv_data)::float as percentage
            FROM csv_data
            GROUP BY age_group
            ORDER BY age_group;
        `;
    
        const result = await pool.query(query);
    
        console.log("Age-Group % Distribution:");
        result.rows.forEach(row => {
            const percentage = Number.isFinite(row.percentage) ? row.percentage.toFixed(2) : 'N/A';
            console.log(`${row.age_group}: ${percentage}%`);
        });
    
    } catch (error) {
        console.error('Failed to calculate age distribution:', error.stack);
    }
}

const uploadCSVData = async (req, res) => {
    try {
        const csvData = await parseCSV(config.CSV_FILE_PATH);

        // Filter out invalid data, including rows where age is null, undefined, or an empty string
        const validData = csvData.filter(user => {
            const { age } = user;
            // Ensure age is not null, undefined, or an empty string
            if (age === null || age === undefined || age.trim() === '') return false;

            let parsedAge = parseInt(age, 10);
            // Check if age is a valid number and not NaN
            return !isNaN(parsedAge);
        });

        // Use Promise.all to wait for all insert operations to complete, but only for valid data
        await Promise.all(validData.map(async (user) => {
            const { name, age, ...additionalInfo } = user;
            let parsedAge = parseInt(age, 10); // No need for redundant NaN check here

            await pool.query(
                'INSERT INTO csv_data (first_name, last_name, age, additional_info) VALUES ($1, $2, $3, $4)',
                [name.firstName, name.lastName, parsedAge, JSON.stringify(additionalInfo)]
            );
        }));

        console.log('Data uploaded successfully.');
        // Calculate and print age distribution
        await printAgeDistribution();
        // Send a response back to the client
        res.status(200).send('Data uploaded successfully.');

    } catch (error) {
        console.error('Failed to upload data:', error);
        // Send an error response
        res.status(500).send('Failed to upload data.');
    }
};



module.exports = { uploadCSVData };

// utils/csvParser.js
const fs = require('fs');
const csv = require('csv-parser');

const parse = (filePath) => {
    return new Promise((resolve, reject) => {
        const jsonData = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                // Extract data from CSV row
                const { firstName, lastName, age, addressLine1, addressLine2, addressCity, addressState, gender } = row;

                // Construct data object
                const data = {
                    name: { firstName, lastName },
                    age: parseInt(age),
                    address: {
                        line1: addressLine1,
                        line2: addressLine2,
                        city: addressCity,
                        state: addressState
                    },
                    additional_info: {
                        gender: gender
                    }
                };

                // Push data object to jsonData array
                jsonData.push(data);
            })
            .on('end', () => {
                resolve(jsonData);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

module.exports = { parse };

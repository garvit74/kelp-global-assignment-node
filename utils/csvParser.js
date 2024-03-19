const fs = require('fs');
const csvParser = require('csv-parser'); 

function parseCSV(filePath) {
  const results = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => {
        const parsedData = parseNestedProperties(data);
        results.push(parsedData);
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', reject);
  });
}

function parseNestedProperties(data) {
  const result = {};

  for (const [key, value] of Object.entries(data)) {
    const keys = key.split('.');
    let current = result;

    keys.forEach((keyPart, index) => {
      if (index === keys.length - 1) {
        current[keyPart] = value;
      } else {
        if (!current[keyPart]) current[keyPart] = {};
        current = current[keyPart];
      }
    });
  }

  return result;
}

module.exports = { parseCSV };

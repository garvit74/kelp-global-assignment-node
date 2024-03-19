// models/csvData.js
const pool = require('../utils/dbConfig');

const createCsvDataTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS csv_data (
            id SERIAL PRIMARY KEY,
            name JSONB,
            age INT,
            address JSONB,
            additional_info JSONB
        );
    `;
    await pool.query(query);
};

const create = async (data) => {
    const query = `
        INSERT INTO csv_data (name, age, address, additional_info)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    const values = [data.name, data.age, data.address, data.additional_info];
    const result = await pool.query(query, values);
    return result.rows;
};

module.exports = { createCsvDataTable, create };

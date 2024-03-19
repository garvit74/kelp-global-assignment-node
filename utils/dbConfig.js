// utils/dbConfig.js
const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool({
    user: config.dbUser,
    host: config.dbHost,
    database: config.dbName,
    password: config.dbPassword,
    port: config.dbPort,
});

module.exports = { pool };

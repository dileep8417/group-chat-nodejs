const mysql = require('mysql2-promise');
const db = mysql();
const { dbCredentials } = require('../config');

db.configure({
    host: dbCredentials.host,
    user: dbCredentials.user,
    password: dbCredentials.password,
    database: dbCredentials.database
});

module.exports = db;
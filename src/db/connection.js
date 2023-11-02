const mysql = require('mysql2-promise');
const db = mysql();

db.configure({
    host: process.env.HOST || 'localhost',
    user: process.env.USER || 'dileep',
    password: process.env.PASSWORD || '4242',
    database: process.env.DB || 'my_chat_app',
});

module.exports = db;
const db = require('../db/connection');
const bcrypt = require('bcrypt');

exports.createUser = async ({userName, password, mobile}) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `INSERT INTO users (name, mobile_number, password) VALUES (?, ?, ?)`;
    await db.query(query, [userName, mobile, hashedPassword]);
}

exports.updateUserDetails = async (userId, {userName, password, mobile}) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'UPDATE users SET name = ?, password = ?, mobile_number = ? WHERE id = ?';
    await db.query(query, [userName, hashedPassword, mobile, userId]);
}

exports.isRegisteredMobile = async (mobileNumber) => {
    const query = 'SELECT id FROM users WHERE mobile_number = ? LIMIT 1';
    const [result] = await db.query(query, [mobileNumber]);

    return result.length > 0;
};

exports.authenticateUser = async ({mobile, password}) => {
    const query = 'SELECT id, password FROM users WHERE mobile_number = ? LIMIT 1';
    const [result] = await db.query(query, [mobile]);
    if (result.length === 0) {
        return null;
    }

    const hashedPassword = result[0].password;
    const isValidPassword = await bcrypt.compare(password, hashedPassword);

    if (isValidPassword) {
        return result[0].id;
    }

    return null;
}

exports.isValidUser = async (userId) => {
    if (!userId) {
        return false;
    }

    const query = 'SELECT id FROM users WHERE id = ?';
    const [result] = await db.query(query, [userId]);

    return result.length > 0;
}

exports.getUsersByName = async (userName) => {
    const query = 'SELECT id, name FROM users WHERE name LIKE ?';
    const [result] = await db.query(query, [`%${userName}%`]);

    return result;
}
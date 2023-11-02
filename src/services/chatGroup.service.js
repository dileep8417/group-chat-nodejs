const db = require('../db/connection');

exports.createGroup = async (groupName, userId) => {
    const query = 'INSERT INTO chat_groups (user_id, group_name) VALUES (?, ?)';
    const result = await db.query(query, [userId, groupName]);

    return result[0].insertId;
}

exports.deleteGroup = async (groupId, userId) => {
    const query = 'UPDATE chat_groups SET is_active = ? WHERE id = ? AND user_id = ?';
    await db.query(query, [0, groupId, userId]);
}

exports.isValidGroupAdmin = async (groupId, userId) => {
    const query = 'SELECT id FROM chat_groups WHERE id = ? AND user_id = ?';
    const [result] = await db.query(query, [groupId, userId]);

    return result.length > 0;
}

exports.addUserToGroup = async (groupId, userId) => {
    const query = 'INSERT INTO users_chat_groups (chat_group_id, user_id) VALUES (?, ?)';
    await db.query(query, [groupId, userId]);
}

exports.isUserAlreadyAddedToGroup = async (groupId, userId) => {
    const query = 'SELECT id FROM users_chat_groups WHERE chat_group_id = ? AND user_id = ?';
    const [result] = await db.query(query, [groupId, userId]);

    return result.length > 0;
}

exports.removeUserFromGroup = async (groupId, userId) => {
    const query = 'DELETE FROM users_chat_groups WHERE chat_group_id = ? AND user_id = ?';
    await db.query(query, [groupId, userId]);
}
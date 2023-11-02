const db = require('../db/connection');

exports.isValidGroupUser = async (userId, groupId) => {
    const query = 'SELECT id FROM users_chat_groups WHERE user_id = ? AND chat_group_id = ?';
    const [result] = await db.query(query, [userId, groupId]);

    return result.length > 0;
}
const db = require('../db/connection');

exports.createMessage = async (userId, groupId, message) => {
    const query = 'INSERT INTO chat_messages (user_id, chat_group_id, message) VALUES(?, ?, ?)';
    await db.query(query, [userId, groupId, message]);
}

exports.likeMessage = async (messageId) => {
    const query = 'UPDATE chat_messages SET liked_count = liked_count + 1 WHERE id = ?';
    await db.query(query, [messageId]);
}

exports.getGroupIdFromMessageId = async (messageId) => {
    const query = 'SELECT chat_group_id FROM chat_messages WHERE id = ?';
    const [result] = await db.query(query, [messageId]);

    return result.length ? result[0]['chat_group_id'] : null;
}
const statusCodes = require('../constants/statusCodes');
const chatMessageService = require('../services/chatMessage.service');
const userChatGroupService = require('../services/userChatGroup.service');
const { initializeResponse } = require('../helpers/utils');

const sendMessage = async (req, res) => {
    const responseToSend = initializeResponse();
    const {userId} = req.user;
    const {groupId = null, message = null} = req.body;

    if (!groupId || !message) {
        responseToSend.errorMsg = 'Invalid request';
        res.status(statusCodes.invalidRequest).json(responseToSend);
        return;
    }

    const canSendMsg = await userChatGroupService.isValidGroupUser(userId, groupId);
    if (!canSendMsg) {
        responseToSend.errorMsg = 'You are not a valid group user';
        res.status(statusCodes.unauthorised).json(responseToSend);
        return;
    }

    await chatMessageService.createMessage(userId, groupId, message);
    
    responseToSend.success = true;
    res.status(statusCodes.success).json(responseToSend);
}

const likeMessage = async (req, res) => {
    const responseToSend = initializeResponse();
    const {userId} = req.user;
    const {messageId} = req.params;

    const groupId = await chatMessageService.getGroupIdFromMessageId(messageId);
    if (!groupId) {
        responseToSend.errorMsg = 'Invalid message id';
        res.status(statusCodes.invalidRequest).json(responseToSend);
        return;
    }

    const isValidGroupUser = await userChatGroupService.isValidGroupUser(userId, groupId);
    if (!isValidGroupUser) {
        responseToSend.errorMsg = 'You are not a valid group user';
        res.status(statusCodes.unauthorised).json(responseToSend);
        return;
    }

    await chatMessageService.likeMessage(messageId);
    
    responseToSend.success = true;
    res.status(statusCodes.success).json(responseToSend);
}

module.exports = {
    sendMessage,
    likeMessage,
};
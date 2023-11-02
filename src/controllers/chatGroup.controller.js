const statusCodes = require('../constants/statusCodes');
const chatGroupService = require('../services/chatGroup.service');
const userService = require('../services/user.service');
const { initializeResponse } = require('../helpers/utils');

const createChatGroup = async (req, res) => {
    const responseToSend = initializeResponse();
    const {userId} = req.user;
    const {groupName = null} = req.body;

    if (!groupName || groupName.length > 255) {
        responseToSend.errorMsg = 'Invalid group name.';
        res.status(statusCodes.invalidRequest).json(responseToSend);
        return;
    }

    const newGroupId = await chatGroupService.createGroup(groupName, userId);
    await chatGroupService.addUserToGroup(newGroupId, userId);

    responseToSend.success = true;
    res.status(statusCodes.success).json(responseToSend);
}

const deleteChatGroup = async (req, res) => {
    const responseToSend = initializeResponse();
    const {userId} = req.user;
    const {groupId} = req.params;

    await chatGroupService.deleteGroup(groupId, userId);
    
    responseToSend.success = true;
    res.status(statusCodes.success).json(responseToSend);
}

const addUserToChatGroup = async (req, res) => {
    const responseToSend = initializeResponse();
    const {groupId, userId} = req.params;

    const isUserAlreadyAddedToGroup = await chatGroupService.isUserAlreadyAddedToGroup(groupId, userId);
    if (isUserAlreadyAddedToGroup) {
        responseToSend.success = false;
        responseToSend.errorMsg = 'User already added to the group';
        res.status(statusCodes.invalidRequest).json(responseToSend);
        return;
    }

    await chatGroupService.addUserToGroup(groupId, userId);

    responseToSend.success = true;
    res.status(statusCodes.success).json(responseToSend);
}

const removeUserFromChatGroup = async (req, res) => {
    const responseToSend = initializeResponse();
    const {groupId, userId} = req.params;

    await chatGroupService.removeUserFromGroup(groupId, userId);

    responseToSend.success = true;
    res.status(statusCodes.success).json(responseToSend);
}

const fetchUsersByName = async (req, res) => {
    const responseToSend = initializeResponse();
    const {searchName} = req.params;

    const results = await userService.getUsersByName(searchName);

    responseToSend.success = true;
    responseToSend.results = results;
    res.status(statusCodes.success).json(responseToSend);
}

module.exports = {
    createChatGroup,
    deleteChatGroup,
    addUserToChatGroup,
    removeUserFromChatGroup,
    fetchUsersByName,
}
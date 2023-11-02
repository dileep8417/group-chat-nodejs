const chatGroupService = require('../services/chatGroup.service');
const statusCodes = require('../constants/statusCodes');

const isValidGroupAdmin = async (req, res, next) => {
    const {userId} = req.user;
    const {groupId = null} = req.params;
    const responseToSend = {};

    const isValidGroupAdmin = await chatGroupService.isValidGroupAdmin(groupId, userId);
    if (!isValidGroupAdmin) {
        responseToSend.errorMsg = 'Not a valid group admin';
        responseToSend.success = false;
        res.status(statusCodes.unauthorised).json(responseToSend);
        return;
    }

    next();
}

module.exports = isValidGroupAdmin;
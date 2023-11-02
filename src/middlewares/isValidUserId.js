const userService = require('../services/user.service');
const statusCodes = require('../constants/statusCodes');

const isValidUserId = async (req, res, next) => {
    const {userId = null} = req.params;
    const responseToSend = {};

    const isValidUser = await userService.isValidUser(userId);
    if (!isValidUser) {
        responseToSend.errorMsg = 'Invalid user id';
        responseToSend.success = false;
        res.status(statusCodes.invalidRequest).json(responseToSend);
        return;
    }

    next();
}

module.exports = isValidUserId;
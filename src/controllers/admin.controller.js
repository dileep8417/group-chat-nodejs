const { validateRegistrationData } = require('../helpers/validation.helper');
const { isRegisteredMobile, createUser, updateUserDetails } = require('../services/user.service');
const { initializeResponse } = require('../helpers/utils');
const statusCodes = require('../constants/statusCodes');

const registerUser = async (req, res) => {
    const responseToSend = initializeResponse();
    const isValidData = validateRegistrationData(req.body, responseToSend);

    if (!isValidData) {
        res.status(statusCodes.invalidRequest).json(responseToSend);
        return;
    }

    // check whether user mobile number already registred or not
    const isRegistered = await isRegisteredMobile(req.body.mobile);
    if (isRegistered) {
        responseToSend.errorMsg = 'User with same mobile number already registered.';
        res.status(statusCodes.invalidRequest).json(responseToSend);
        return;
    }

    // Register as new user
    await createUser(req.body);

    responseToSend.success = true;
    res.status(statusCodes.success).json(responseToSend);
}

const editUserDetails = async (req, res) => {
    const responseToSend = initializeResponse();
    const {userId} = req.params;
    const isValidData = validateRegistrationData(req.body, responseToSend);

    if (!isValidData) {
        res.status(statusCodes.invalidRequest).json(responseToSend);
        return;
    }

    await updateUserDetails(userId, req.body);

    responseToSend.success = true;
    res.status(statusCodes.success).json(responseToSend);
}

module.exports = {
    registerUser,
    editUserDetails
}
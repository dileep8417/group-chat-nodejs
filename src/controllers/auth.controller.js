const statusCodes = require('../constants/statusCodes');
const { validateLoginData } = require('../helpers/validation.helper');
const { authenticateUser } = require('../services/user.service');
const { createJWTToken, setJWTCookie, authenticateAdmin } = require('../helpers/auth.helper');
const { initializeResponse } = require('../helpers/utils');

const loginUser = async (req, res) => {
    const responseToSend = initializeResponse();
    const isValidData = validateLoginData(req.body, responseToSend);

    if (!isValidData) {
        res.status(statusCodes.invalidRequest).json(responseToSend);
        return;
    }
    
    let user;
    const {toLoginAsAdmin = false} = req.body;

    if (toLoginAsAdmin) {
        user = authenticateAdmin(req.body);
    } else {
        user = await authenticateUser(req.body);
    }
    if (!user) {
        responseToSend.errorMsg = 'Invalid mobile/password.';
        res.status(statusCodes.unauthorised).json(responseToSend);
        return;
    }

    const token = createJWTToken(user, toLoginAsAdmin);

    // set token in cookie for subsequent requests
    setJWTCookie(res, token);
    
    responseToSend.success = true;
    res.json(responseToSend);
}

const logOutUser = (req, res) => {
    res.cookie('jwt', '', {expires: new Date(0)});
    res.sendStatus(statusCodes.success);
}

module.exports = {
    loginUser,
    logOutUser,
};
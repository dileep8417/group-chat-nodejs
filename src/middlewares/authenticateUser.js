const statusCodes = require('../constants/statusCodes');
const { validateToken } = require('../helpers/auth.helper');

const authenticateUser = (req, res, next) => {
    const responseOnError = {
        success: false,
        errorMsg: 'Unautherised user. Please login again.'
    };

    const {jwt = null} = req.cookies;
    if (!jwt) {
        res.status(statusCodes.unauthorised).json(responseOnError);
        return;    
    }
    
    // if valid token sets user data in req object
    validateToken(req, jwt);
    
    if (!req.user) {
        res.status(statusCodes.unauthorised).json(responseOnError);
        return;
    }

    next();
}

module.exports = authenticateUser;
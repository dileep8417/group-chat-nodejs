const statusCodes = require('../constants/statusCodes');

const allowOnlyNormalUser = (req, res, next) => {
    const errorResponse = {};
    const {isAdmin = false} = req.user;

    if (!isAdmin) {
        next();
        return;
    }

    errorResponse.success = false;
    errorResponse.errorMsg = 'You are not having access.';

    res.status(statusCodes.unauthorised).json(errorResponse);
}

module.exports = allowOnlyNormalUser;
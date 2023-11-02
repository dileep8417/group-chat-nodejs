exports.validateRegistrationData = ({userName = null, mobile = null, password = null}, responseToSend) => {
    if (!userName || !mobile || !password) {
        responseToSend.errorMsg = 'Insufficient data';
        return false;
    }

    if (mobile.length > 10) {
        responseToSend.errorMsg = 'Mobile number is more than 10 digits';
        return false;
    }

    if (password.length < 4) {
        responseToSend.errorMsg = 'Password must be greater than 3 characters';
        return false;
    }

    
    return true;
}

exports.validateLoginData = ({mobile = null, password = null}, responseToSend) => {
    if (!mobile || !password) {
        responseToSend.errorMsg = 'Insufficient data';
        return false;
    }

    return true;
}
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET || 'mySecretKey';
const { adminCredentials } = require('../config');

exports.authenticateAdmin = ({mobile, password}) => {
    return adminCredentials.mobile === mobile && adminCredentials.password === password;
}

exports.createJWTToken = (userId, toLoginAsAdmin) => {
    let payload;

    if (toLoginAsAdmin) {
        payload = {
            isAdmin: 1
        };
    } else {
        payload = {
            userId
        };
    }

    const options = {
        expiresIn: '720h' // expires in 30 days
    };

    return jwt.sign(payload, secretKey, options);
}

exports.setJWTCookie = (res, token) => {
    const cookieOptions = {
        maxAge: 2592000, // 30 days in seconds
        httpOnly: true,
        sameSite: 'strict'
    };

    res.cookie('jwt', token, cookieOptions);
}

exports.validateToken = (req, token) => {
    jwt.verify(token, secretKey, (err, payload) => {
        if (err) {
            req.user = null;
            return;
        }
        
        req.user = payload;
    });
}
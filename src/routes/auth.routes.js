const router = require('express').Router();
const controller = require('../controllers/auth.controller');

// base url will be /auth
// To login user
router.post('/login', controller.loginUser);

// To logout user
router.post('/logout', controller.logOutUser);

module.exports = router;
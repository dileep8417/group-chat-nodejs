const router = require('express').Router();
const controller = require('../controllers/admin.controller');

const allowOnlyAdminUser = require('../middlewares/allowOnlyAdminUser');
const authenticateUser = require('../middlewares/authenticateUser');

// To check user is loggedin or not
router.use(authenticateUser);
// To check loggedin user is admin user or not
router.use(allowOnlyAdminUser);

// To create new user
router.post('/addUser', controller.registerUser);

// To edit user details
router.put('/editUser/:userId', controller.editUserDetails);


module.exports = router;
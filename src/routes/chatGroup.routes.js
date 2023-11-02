const router = require('express').Router();
const controller = require('../controllers/chatGroup.controller');

const authenticateUser = require('../middlewares/authenticateUser');
const allowOnlyNormalUser = require('../middlewares/allowOnlyNormalUser');
const isValidGroupAdmin = require('../middlewares/isValidGroupAdmin');
const isValidUserId = require('../middlewares/isValidUserId');

// To check user is loggedin or not
router.use(authenticateUser);
// To check loggedin user is normal user or not
router.use(allowOnlyNormalUser);

// base path will be /group
// To create a new chat group
router.post('/new', controller.createChatGroup);

// To delete chat group
router.delete('/remove/:groupId', isValidGroupAdmin, controller.deleteChatGroup);

// To search users by username
router.get('/search/:searchName', controller.fetchUsersByName);

// To add user in a chat group
router.post('/addUser/:groupId/:userId', isValidGroupAdmin, isValidUserId, controller.addUserToChatGroup);

// to remove user from a chat group
router.delete('/removeUser/:groupId/:userId', isValidGroupAdmin, isValidUserId, controller.removeUserFromChatGroup);

module.exports = router;
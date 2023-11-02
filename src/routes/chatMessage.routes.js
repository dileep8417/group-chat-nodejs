const router = require('express').Router();
const controller = require('../controllers/chatMessage.controller');

const authenticateUser = require('../middlewares/authenticateUser');
const allowOnlyNormalUser = require('../middlewares/allowOnlyNormalUser');

router.use(authenticateUser);
router.use(allowOnlyNormalUser);

// base url will be /message
// To send message in a group chat
router.post('/send', controller.sendMessage);

// To like the message in the chat
router.patch('/like/:messageId', controller.likeMessage);

module.exports = router;
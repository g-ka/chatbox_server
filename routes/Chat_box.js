const express = require('express');
const router = express.Router();
const chat_box_controller = require('../controller/Chat_box_controller');

router.post('/', chat_box_controller.chat_box_handler);
router.post('/message', chat_box_controller.save_message_handler);
router.delete('/delete_message/:receiver_name/:message_id', chat_box_controller.delete_message_handler);

module.exports = router
const express = require('express');
const router = express.Router();
const session_check_controller = require('../controller/Session_check_controller');

router.get('/', session_check_controller.session_check_handler);

module.exports = router
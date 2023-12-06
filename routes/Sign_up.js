const express = require('express');
const router = express.Router();
const sign_up_controller = require('../controller/Sign_up_controller');

router.post('/', sign_up_controller.sign_up_handler);

module.exports = router
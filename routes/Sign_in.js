const express = require('express');
const router = express.Router();
const sign_in_controller = require('../controller/Sign_in_controller');

router.post('/', sign_in_controller.sign_in_handler);

module.exports = router
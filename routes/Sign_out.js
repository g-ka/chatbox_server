const express = require('express');
const router = express.Router();
const sign_out_controller = require('../controller/Sign_out_controller');

router.get('/', sign_out_controller.sign_out_handler);

module.exports = router
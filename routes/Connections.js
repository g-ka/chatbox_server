const express = require('express');
const router = express.Router();
const connections_controller = require('../controller/Connections_controller');

router.get('/', connections_controller.connections_handler);

module.exports = router
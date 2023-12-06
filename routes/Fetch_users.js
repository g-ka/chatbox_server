const express = require('express');
const router = express.Router();
const fetch_users_controller = require('../controller/Fetch_users_controller');

router.get('/', fetch_users_controller.fetch_users_handler);

module.exports = router
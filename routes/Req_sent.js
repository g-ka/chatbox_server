const express = require('express');
const router = express.Router();
const req_sent_controller = require('../controller/Req_sent_controller');

router.get('/', req_sent_controller.fetch_req_sent_handler);
router.post('/', req_sent_controller.req_sent_handler);

module.exports = router
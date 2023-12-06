const express = require('express');
const router = express.Router();
const req_recieved_controller = require('../controller/Req_recieved_controller');

router.get('/', req_recieved_controller.req_recieved_handler);
router.post('/accept_req', req_recieved_controller.accept_req_handler);

module.exports = router
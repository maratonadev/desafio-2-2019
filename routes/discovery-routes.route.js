const express = require('express');
const router = express.Router();
const discovery_controller = require('../controllers/discovery.controller');

router.post("/query", discovery_controller.discoveryQuery);

module.exports = router;

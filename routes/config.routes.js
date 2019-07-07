const express = require('express');
const router = express.Router();
const config_controller = require('../controllers/config.controller');

router.post("/validad2", config_controller.validad2)

router.get("/testa", config_controller.getTest);


module.exports = router;

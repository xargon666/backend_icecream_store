const express = require('express');
const router = express.Router();

const controller = require('../controllers/testController.js')

router.get('/',controller.get)

module.exports = router

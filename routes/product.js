const express = require('express');
const router = express.Router();

const controller = require('../controllers/productController.js')

router.get('/',controller.get)

module.exports = router

const express = require('express');
const router = express.Router();
const Produce = require('../controllers/produceController')

router.route('/newProduce').post(Produce.AddProduce)

module.exports = router;
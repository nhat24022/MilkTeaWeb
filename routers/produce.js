const express = require('express');
const router = express.Router();
const Produce = require('../controllers/produceController')

router.route('/newProduce').post(Produce.AddProduce)
router.route('/:code').get(Produce.GetProduce)
router.route('/update').put(Produce.UpdateTotal)

module.exports = router;
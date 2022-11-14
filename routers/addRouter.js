const express = require('express');
const router = express.Router();
const AddminController = require('../controllers/AddminController')

// API create new addMin
router.route('/').post(AddminController.CreateAddmin);

router.route('/UpdateAdd').post(AddminController.UpdateAdd);

router.route('/AllAdd').get(AddminController.GetAllAddMin);

router.route('/deleteAdd').post(AddminController.DeleteAdd);

router.route('/').post(AddminController.CreateAddmin);

module.exports = router;



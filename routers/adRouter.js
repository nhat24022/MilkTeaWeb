const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController')

// API create new adMin
router.route('/').post(AdminController.CreateAdmin);

router.route('/UpdateAd').post(AdminController.UpdateAd);

router.route('/AllAd').get(AdminController.GetAllAdMin);

router.route('/deleteAd').post(AdminController.DeleteAd);

router.route('/').post(AdminController.CreateAdmin);

module.exports = router;



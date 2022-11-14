const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js')
//gel all of users
router.route('/').get(userController.GetAllUser);

// ad new user 
router.route('/NewUser').post(userController.PostNewUser);

//get user by id:
router.route('/:id').get(userController.GetUserById);

router.route('/Login').post(userController.Login);

module.exports = router;
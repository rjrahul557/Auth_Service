const express = require('express');
const UserController = require('../../controllers/user-controller');
const {AuthRequestValidator} = require('../../middlewares/index');

const router = express.Router();

router.post('/signup',AuthRequestValidator.validateUserAuth,UserController.create);
router.post('/signin',AuthRequestValidator.validateUserAuth,UserController.signin);
module.exports  = router;
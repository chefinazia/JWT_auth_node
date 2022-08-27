const express = require('express');
const userController = require('../controllers/userController')
const router  = express.Router();


router.post('/createUser',userController.createUser);
router.post('/signInUser',userController.signInUser);


module.exports = router
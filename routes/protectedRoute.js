const express = require('express'),
jwt     = require('express-jwt'),
config  = require('../config.json')

const protectedController = require('../controllers/protectedController')
const router  = express.Router();

let jwtCheck = jwt.expressjwt({
    secret: config.secret,
    audience: config.audience,
    issuer: config.issuer,
    algorithms: ["HS256"]
  });


router.post('/route1',jwtCheck,protectedController.protectedFunction('full_access'));

module.exports = router
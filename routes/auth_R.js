const express = require('express');
const router = express.Router();

const {valuesToAdd,encrypPass,valuesToLogin} = require('../middleware/auth_MID');
const {register,login,createJwt} = require('../controller/auth_C.js');

router.post('/reg',valuesToAdd,encrypPass,register);
router.post('/login',valuesToLogin,login,createJwt);

module.exports = router;
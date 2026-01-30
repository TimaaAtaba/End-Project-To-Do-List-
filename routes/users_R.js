const express = require('express');
const router = express.Router();
const {getAllUsers,getOneUser,deleteUser,updateUser} = require('../controller/users_C.js');
const { isValidId, valuesToEdit } = require('../middleware/users_MID');
const { isLoggedIn } = require('../middleware/auth_MID');

router.get('/',isLoggedIn,getAllUsers);
router.get('/:id',isValidId,getOneUser);
router.delete('/:id',isValidId,deleteUser);
router.patch('/:id',isValidId,valuesToEdit,updateUser);

module.exports = router;

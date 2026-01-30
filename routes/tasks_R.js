const express = require('express');
const router = express.Router();
const {getAllTasks,addTask,getTask,deleteTask, updateTask} = require('../controller/tasks_C');
const {isLoggedIn} = require('../middleware/auth_MID');
const {valuesToAdd,isValidId,valuesToEdit} = require('../middleware/tasks_MID');


router.get('/',isLoggedIn,getAllTasks);
router.post('/',isLoggedIn,valuesToAdd,addTask);
router.get('/:id',isLoggedIn,isValidId,getTask);
router.delete('/:id',isLoggedIn,isValidId,deleteTask);
router.patch('/:id',isLoggedIn,isValidId,valuesToEdit,updateTask);


module.exports = router;
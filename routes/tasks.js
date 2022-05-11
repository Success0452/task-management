const express = require('express')

const router = express.Router();

const {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteItem
} = require('../controller/tasks')

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteItem);

module.exports = router;
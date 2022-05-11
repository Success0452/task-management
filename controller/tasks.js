const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../middleware/custon-error');
const Task = require('../model/Task');

const getAllTasks = asyncWrapper (async(req, res) => {
       const tasks = await Task.find({})
       return res.status(200).json({tasks: tasks})
})

const createTask = asyncWrapper( async(req, res) => {
    const task = await Task.create(req.body)
    return res.status(200).json({ task })
})

const getTask = asyncWrapper( async (req, res, next) => {
    const {id:taskID} = req.params
        const task = await Task.findOne({_id: taskID}).exec();
        if(!task){
         return next(createCustomError(`no task with the ${taskID}`, 400))
        }
        return res.status(200).json({task: task})
}
)
const updateTask = asyncWrapper (async(req, res) => {
    const {id: taskID} = req.params
    const task = await Task.findOneAndUpdate({_id: taskID}, req.body, 
        {
            new: true,
            runValidators: true
        })
        if(!task){
            return next(createCustomError(`no task with the ${taskID}`, 400))
        }
    return res.status(200).json({ task })
})

const deleteItem = asyncWrapper (async(req, res) => {
    const {id:taskID} = req.params
    const task = await Task.findOneAndDelete({_id:taskID})

    if(!task){
        return next(createCustomError(`no task with the ${taskID}`, 400))
    }

    return res.status(200).json({task: null, success: true})
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteItem
}


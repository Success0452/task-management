const Task = require('../model/Task');

const getAllTasks = async(req, res) => {
    
    try {
        const tasks = await Task.find({})
       return res.status(200).json({tasks: tasks})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: error})
    }
}

const createTask = async(req, res) => {
    try {        
        const task = await Task.create(req.body)
        return res.status(200).json({ task })
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: error})
    }
}

const getTask = async (req, res) => {
    try {
        const {id:taskID} = req.params
        const task = await Task.findOne({_id: taskID}).exec();
        if(!task){
            return res.status(404).json({msg : `task with the ${taskID} doent exist`})
        }
        return res.status(200).json({task: task})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: error})
    }
}

const updateTask = async(req, res) => {
    
    try {
        const {id: taskID} = req.params
        const task = await Task.findOneAndUpdate({_id: taskID}, req.body, 
            {
                new: true,
                runValidators: true
            })
            if(!task){
                return res.status(404).json({msg: task})
            }
        return res.status(200).json({ task })
    } catch (error) {
       return res.status(500).json({msg: error}) 
    }
}

const deleteItem = async(req, res) => {
    try {
        const {id:taskID} = req.params
        const task = await Task.findOneAndDelete({_id:taskID})

        if(!task){
            return res.status(404).json({msg: `cann't find item with id of ${taskID}`})
        }

        return res.status(200).json({task: null, success: true})
    } catch (error) {
        return res.status(500).json({msg: error})
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteItem
}


const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'must provide name'],
            trim: true,
            maxlength: [20, 'must not be more than 20 char']
        }, 
        completed: {
            type: Boolean,
            default: false
        }
    })

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
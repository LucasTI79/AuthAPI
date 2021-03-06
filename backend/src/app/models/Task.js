const mongoose = require('../../database');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        require:true
    },
    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    assignedTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    tasks:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
    },
    completed:{
        type: Boolean,
        required: true,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
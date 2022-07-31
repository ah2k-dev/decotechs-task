const mongoose = require('mongoose');

const schema = mongoose.Schema

const todoSchema = schema({
    user: {
        type: schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        rqruired: true
    },
    priority: {
        type: String,
        enum: ['low', 'normal', 'high'],
        default: 'low',
    },
    time: {
        type: Date,
        required: true
    },
    remarks: {
        type: String,
        default: " "
    },
    status: {
        type: String,
        enum: ['pending', 'uncompleted', 'completed'],
        default: 'pending'
    },
},
    {
        timestamps: true
    }
);

const todo = mongoose.model('todos', todoSchema);

module.exports = todo
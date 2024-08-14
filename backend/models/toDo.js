const mongoose = require('mongoose');

const toDoSchema = mongoose.Schema(
    {
        title: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: true  
        },
        date: {
            type: Date,
            require: true
        },
        isDone: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

const toDo = mongoose.model('toDo', toDoSchema);

module.exports = toDo;
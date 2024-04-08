// Temp model required to get server running
const { Schema, model } = require('mongoose');

const tasksSchema = new Schema ({
task: {
    type: String,
    required: true,
},
user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
},
dueDate: {
    type: Date,
},
completed: {
    type: Boolean,
    default: false,
}
});

const Tasks = model('Tasks', tasksSchema);

module.exports = Tasks;
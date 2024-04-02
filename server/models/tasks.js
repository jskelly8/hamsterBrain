// Temp model required to get server running
const { Schema, model } = require('mongoose');

const tasksSchema = new Schema ({
taskId: {
    type: String,
    required: true,
    unique: true,
},
task: {
    type: String,
    required: true,
},
user: {
    type: Schema.Types.ObjectId,
    ref: 'Profile', // Should this be user???
    required: true,
},
});

const Tasks = model('Tasks', tasksSchema);

module.exports = Tasks;
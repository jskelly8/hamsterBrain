// Temp model required to get server running
const { Schema, model } = require('mongoose');

const UserSchema = new Schema ({
username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
},
name: {
    type: String,
},
email: {
    type: String,
    required: true,
    unique: true,
},
password: {
    type: String,
    required: true,
    unique: true
},
});

const User = model('User', UserSchema);

module.exports = User;
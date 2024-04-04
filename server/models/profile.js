// Temp model required to get server running
const { Schema, model } = require('mongoose');

const profileSchema = new Schema ({
username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
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

const Profile = model('Profile', profileSchema);

module.exports = Profile;
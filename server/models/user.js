// Temp model required to get server running
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema ({
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
    minlength: 3
},
buddyId: {
  type: String,
  required: false
},
avatarColor: {
  type: String
},
points: {
  type: Number,
  default: 0,
},
partner: {
  type: String,
  required: false,
}
});

UserSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  UserSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };
 
  UserSchema.methods.updateProfile = async function(username, email, avatarColor){
    this.username = username;
    this.email = email;
    this.avatarColor = avatarColor;
    await this.save();
  };

const User = model('User', UserSchema);

module.exports = User;
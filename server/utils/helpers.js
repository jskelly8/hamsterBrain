const { v4: uuidv4 } = require('uuid');
const {nanoid} = require('nanoid');
const User = require('../models/user');

const generateUniqueId = () => {
  return uuidv4();
};

const generateBuddyCode = async () => {
  let code;
  do {
    code = nanoid(7);
    const existingUser = await User.findOne({buddyCode: code});
    if (!existingUser) {
      break;
    }
  } while(true);
    return code;
};
module.exports = { generateUniqueId, generateBuddyCode};
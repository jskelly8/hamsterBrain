// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { MongoClient } = require('mongodb');
const {User} = require('../models')
// const DATABASE_URL = 'mongodb://localhost:27017';
// const DATABASE_NAME = 'your_database_name';
// const COLLECTION_NAME = 'users';
const { signToken, AuthenticationError } = require("../utils/auth");
// const JWT_SECRET = 'your_jwt_secret';

// const signUpUser = async (userData) => {
//   const client = new MongoClient(DATABASE_URL);

//   try {
//     await client.connect();

//     const db = client.db(DATABASE_NAME);
//     const collection = db.collection(COLLECTION_NAME);

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(userData.password, 10);
//     userData.password = hashedPassword;

//     // Insert user into the database
//     const result = await collection.insertOne(userData);
//     const user = result.ops[0];

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

//     return { token, user };
//   } finally {
//     await client.close();
//   }
// };

const resolvers = {
  Mutation: {
    signUp: async (_, { input }) => {
      // return await signUpUser(input);
      const user = await User.create({...input});
            const token = signToken(user);
      
            return { token, user};
    }
  }
};

module.exports = resolvers;
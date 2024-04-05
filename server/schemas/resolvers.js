const { User } = require('../models')
const { signToken, AuthenticationError } = require("../utils/auth");


const resolvers = {
  Query: {
    users: async () => 
    {
      const users = await User.find();
      return users;
    },
    user: async () => {
      const user = await User.findOne({username});
      return user;
    },
    me:  async (_, args, context) => {
      if (context.user){
      const user = await User.findById(context.user.id);
      return user;}
      throw AuthenticationError;
    },
  },
  
  
  Mutation: {
//     signUp: async (_, { input }) => {
//       // return await signUpUser(input);
//       const user = await User.create({...input});
//             const token = signToken(user);
      
//             return { token, user};
//     }
//   }
// };

addUser: async (parent, { username, email, password }) => {
  const user = await User.create({ username, email, password });
  const token = signToken(user);
  return { token, user };
},
login: async (parent, {email, password}) => {

  // const {email, password} = {...input};
  const user = await User.findOne({ email });
  console.log(user);


  if (!user) {
    throw AuthenticationError;
  }
  
  const correctPw = await user.isCorrectPassword(password);

  console.log(correctPw)

  if (!correctPw) {
    throw AuthenticationError;
  }

  const token = signToken(user);

  return { token, user };
}
}
}


module.exports = resolvers;
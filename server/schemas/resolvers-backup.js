// const { User } = require("../models");
// const { signToken, AuthenticationError } = require("../utils/auth");
// const resolvers = {
//   Query: {
//     Users: async () => {
//       return User.find();
//     },
//     User: async (parent, { UserId }) => {
//       return User.findOne({ _id: UserId });
//     },
//     me: async (parent, args, context) => {
//       if (context.user) {
//         return User.findOne({ _id: context.user._id });
//       }
//       throw AuthenticationError;
//     },
//     tasks: async (parent, { taskId }) => {
//         return Tasks.find();
//     }
//   },

//   Mutation: {
//     addUser: async (parent, { username, email, password }) => {
//       const Profile = await User.create({ username, email, password });
//       const token = signToken(Profile);

//       return { token, User };
//     },
//     login: async (parent, { email, password }) => {
//       const Profile = await User.findOne({ email });

//       if (!Profile) {
//         throw AuthenticationError;
//       }
//       const rightPw = await User.isCorrectPassword(password);

//       if (!rightPw) {
//         throw AuthenticationError;
//       }

//       const token = signToken(User);
//       return { token, User };
//     },

//     editUser: (parent, { input }, context) => {
//       if (!context.User) {
//         throw AuthenticationError;
//       }
//       try {
//         const user = context.User;
//         if (!user) {
//           throw Error();
//         }
//         if (input.name) {
//           User.name = input.name;
//         }
//         if (input.username) {
//           User.username = input.username;
//         }
//         if (input.email) {
//           User.email = input.email;
//         }
//         if (input.buddyemail) {
//           User.buddyemail = input.buddyemail;
//         }
//         if (input.password) {
//           User.password = input.password;
//         }
//       } catch (err) {
//         throw Error();
//       }
//     },
//     addTask: async (parent, { task }, context) => {
//       if (!context.user) {
//         throw new Error("User not authenticated");
//       }

//       const newTask = await Task.create({
//         taskId: generateUniqueId(),
//         task,
//         user: context.user._id,
//       });

//       return newTask;
//     },
//   },
// };

// module.exports = resolvers;






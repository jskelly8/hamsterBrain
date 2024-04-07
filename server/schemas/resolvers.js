const { User, Tasks } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");


const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find();
      return users;
    },
    user: async () => {
      const user = await User.findOne({ username });
      return user;
    },
    me: async (_, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user.id);
        return user;
      }
      throw AuthenticationError;
    },
    tasks: async (_, args, context) => {
      if (context.user) {
        return await Tasks.find({ user: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      console.log(user);

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      console.log(correctPw);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addTask: async (parent, { task, dueDate, dueTime }, context) => {
      if (context.user) {
        const newTask = await Tasks.create({ task, dueDate, dueTime, user: context.user._id });
        return newTask;
      }
      throw AuthenticationError;
    },
    deleteTask: async (parent, { taskId }, context) => {
      if (context.user) {
        return await Tasks.findByIdAndDelete(taskId);
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    updateTask: async (_, { taskId, task, dueDate, dueTime }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in");
      }
      const updateData = {
        task,
        dueDate: dueDate ? new Date(dueDate) : null,
        dueTime
      };
      return await Tasks.findByIdAndUpdate(taskId, updateData, { new: true });
    },
    updateUser: async (_, { id, username, email, avatarColor }) => {
      try {
        // Find the user by ID
        const user = await User.findById(id);
    
        // Check if the user exists
        if (!user) {
          throw new Error('User not found');
        }
    
        // Update user data
        user.username = username;
        user.email = email;
        user.avatarColor = avatarColor;
    
        // Save the updated user data
        await user.save();
    
        // Return the updated user object
        return user;
      } catch (error) {
        // Handle errors (e.g., database errors, validation errors)
        console.error('Error updating user:', error);
        throw new Error('Failed to update user');
      }
    }
  },
};

module.exports = resolvers;
ports = resolvers;
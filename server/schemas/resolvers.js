const { User, Tasks } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const { generateBuddyCode } = require('../utils/helpers');

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
    addUser: async (parent, { username, email, password}) => {
      const buddyId = await generateBuddyCode();
      const user = await User.create({ username, email, password, buddyId });
      const token = signToken(user);
      return { token, user };
    },
    updateUser: async ( parent, {userId, buddyId}) => {
      const updatedUser = await User.findByIdAndUpdate(
        userId, {buddyId}, {new:true}
      );
      return updatedUser;
    },
    login: async (parent, { email, password }) => {
      // const {email, password} = {...input};
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
    }
  },
};

module.exports = resolvers;

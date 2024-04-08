const { User, Tasks, Post } = require("../models");
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
        const user = await User.findById(context.user._id);
        return user;
      }
      throw new AuthenticationError;
    },
    tasks: async (_, args, context) => {
      if (context.user) {
        return await Tasks.find({ user: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // Fetches all posts
    posts: async () => {
      return await Post.find().sort({ createdAt: -1 });
    },

    // Fetches a single post
    post: async (_, { id }) => {
      return await Post.findById(id);
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
        throw new AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addTask: async (parent, { task, dueDate, dueTime }, context) => {
      if (context.user) {
        const newTask = await Tasks.create({
          task,
          dueDate,
          dueTime,
          user: context.user._id,
        });
        return newTask;
      }
      throw new AuthenticationError;
    },
    deleteTask: async (parent, { taskId }, context) => {
      if (!context.user) {
          throw new AuthenticationError("You need to be logged in!");
      }
      const taskToDelete = await Tasks.findById(taskId);
      if (!taskToDelete) {
          throw new Error("Task not found");
      }
      const result = await User.findByIdAndUpdate(context.user._id, {
          $inc: { points: taskToDelete.points }
      }, { new: true }); 
      console.log("Updated user points:", result);
      return await Tasks.findByIdAndDelete(taskId);
  },
  updateTask: async (parent, { taskId, task, dueDate, dueTime, completed }, context) => {
    if (!context.user) {
      throw new AuthenticationError("You must be logged in");
    }
    const updateData = {
      task,
      dueDate: dueDate ? new Date(dueDate) : null,
      dueTime,
      completed
    };

    // Updating task completion and incrementing points if the task is marked completed
    const updatedTask = await Tasks.findByIdAndUpdate(taskId, updateData, { new: true });
    if (completed) {
      await User.findByIdAndUpdate(context.user._id, {
        $inc: { points: 10 } // Increment points by 10
      });
      await Tasks.findByIdAndDelete(taskId);
      return { ...updatedTask.toObject(), completed };
    } else {
      await Tasks.findByIdAndUpdate(taskId, updateData, { new: true });
    }
    return updatedTask;
  },

    addPost: async (_, { title, content }, context) => {
      if (context.user) {
        const newPost = new Post({
          title,
          content,
          author: context.user._id,
        });
        await newPost.save();
        return newPost;
      }
      throw new AuthenticationError("Log-in required for posting");
    },

    updateUser: async (_, { username, email, avatarColor }, context) => {
      try {
        // Find the user by ID
        const user = await User.findByIdAndUpdate(context.user._id,{
          $set: { username, email, avatarColor }
        }, { new: true, runValidators: true });
        
        console.log(user)

        // Check if the user exists
        if (!user) {
          throw new Error("User not found");
        }

        // // Update user data
        // user.username = username;
        // user.email = email;
        // user.avatarColor = avatarColor;

        // // Save the updated user data
        // await user.save();

        // Return the updated user object
        return user;
      } catch (error) {
        // Handle errors (e.g., database errors, validation errors)
        console.error("Error updating user:", error);
        throw new Error("Failed to update user");
      }
    },

    // CRUD operations for posting
  },
  // If your Post model references other models (like User), you might need to add field resolvers
  // Post: {
  //   author: async (post, args, context) => {
  //     // Assuming 'author' stores the ID
  //     return await User.findById(post.author);
  //   },
  // },
};

module.exports = resolvers;

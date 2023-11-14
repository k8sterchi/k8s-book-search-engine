const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-password')
          .populate('savedBooks');
        return userData;
      }
      throw new Error('Not logged in');
    },
    getUserById: async (_, { userId }) => {
      const user = await User.findById(userId).populate('savedBooks');
      return user;
    },
    getAllBooks: async () => {
      const books = await Book.find();
      return books;
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user || !user.isCorrectPassword(password)) {
        throw new Error('Incorrect email or password');
      }

      const token = signToken(user);

      return { token, user };
    },
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (_, { bookData }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookData } },
          { new: true, runValidators: true }
        ).populate('savedBooks');

        return updatedUser;
      }
      throw new Error('You need to be logged in to save a book.');
    },
    removeBook: async (_, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        ).populate('savedBooks');

        return updatedUser;
      }
      throw new Error('You need to be logged in to remove a book.');
    },
  },
};

module.exports = resolvers;


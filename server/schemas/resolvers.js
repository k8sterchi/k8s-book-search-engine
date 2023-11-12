const { User, Book } = require('../models');
// const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    getUserById: async (_, { userId }) => {
      return User.findById(userId);
    },
    getAllBooks: async () => {
      return Book.find();
    },
  },
  Mutation: {
    addUser: async (_, { username, email, password }) => {
      return User.create({ username, email, password });
    },
    saveBook: async (_, { userId, book }) => {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { savedBooks: book } },
        { new: true }
      );
      return updatedUser;
    },
  },
  User: {
    bookCount: (parent) => parent.savedBooks.length,
  },
};

module.exports = resolvers;

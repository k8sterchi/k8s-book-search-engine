// GraphQL types
const typeDefs = `
  type Book {
    _id: ID
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
    bookCount: Int
  }

  input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Query {
    getUserById(userId: ID!): User
    getAllBooks: [Book]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
    saveBook(userId: ID!, book: BookInput!): User
  }
`;

module.exports = typeDefs;
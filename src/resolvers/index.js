const { PubSub } = require('graphql-subscriptions')

const pubsub = new PubSub()

const {
  roleMutations,
  userMutations,
  authMutations,
  statusMutations,
  bookMutations,
  contentMutations
} = require('./mutations')
const {
  userQuerys,
  roleQuerys,
  contentQuerys,
  bookQuerys
} = require('./querys')

const resolvers = {
  Query: {
    // user
    getUsers: (_, __, context) => userQuerys.getUsers(context),
    getUserById: (_, args) => userQuerys.getUserById(args),

    // book
    getBooks: (_, __, context) => bookQuerys.getBooks(context),
    getBookById: (_, args) => bookQuerys.getBookById(args),

    // content
    getContents: (_, __, context) => contentQuerys.getContents(context),
    getContentsById: (_, args) => contentQuerys.getContentById(args),

    // role
    getRoles: (_, __, context) => roleQuerys.getRoles(context)
  },
  Mutation: {
    // user
    createUser: (_, args) => userMutations.createUser(args),
    updateUser: (_, args, context) => userMutations.updateUser(args, context),
    deleteUser: (_, args, context) => userMutations.deleteUser(args, context),
    disableOrActiveUser: (_, __, context) =>
      userMutations.disableOrActiveUser(context),

    // book
    createBook: (_, args, context) => bookMutations.createBook(args, context),
    updateBook: (_, args, context) => bookMutations.updateBook(args, context),
    deleteBook: (_, args, context) => bookMutations.deleteBook(args, context),
    disableOrActiveBook: (_, args, context) =>
      bookMutations.disableOrActiveBook(args, context),

    // content
    createContent: (_, args, context) =>
      contentMutations.createContent(args, context, pubsub),

    // role
    createRole: (_, args, context) => roleMutations.createRole(args, context),

    // status
    createStatus: (_, args, context) =>
      statusMutations.createStatus(args, context),

    // auth
    loginWhitNickNameAndPassword: (_, args) =>
      authMutations.loginWhitNickNameAndPassword(args),
    loginWhitToken: (_, args) => authMutations.loginWhitToken(args)
  },
  Subscription: {
    contentAdd: {
      subscribe: () => pubsub.asyncIterator('CONTENT_ADD')
    }
  }
}

module.exports = resolvers

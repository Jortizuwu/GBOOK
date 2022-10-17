const { gql } = require('apollo-server')

const typeDefs = gql`
  interface MutationResponse {
    code: Int!
    success: Boolean!
    message: String
  }

  type User {
    uid: ID
    name: String
    lastName: String
    nickName: String
    password: String
    createdAt: String
    updatedAt: String
    Status: Status
    Role: Role
    Books: [Book]
  }

  type Role {
    roleID: ID
    name: String
    createdAt: String
    updatedAt: String
  }

  type Status {
    statusID: ID
    statusCode: String
    createdAt: String
    updatedAt: String
  }

  type Book {
    bookID: ID
    User: User
    Status: Status
    bookName: String
    description: String
    createdAt: String
    updatedAt: String
  }

  type Content {
    bookID: ID
    uid: ID
    content: String
    createdAt: String
    updatedAt: String
  }

  # enums
  enum AllRoles {
    ADMIN
    USER
  }
  enum AllStatus {
    ACTIVE
    INACTIVE
  }

  # responses
  type RoleResponse implements MutationResponse {
    code: Int!
    success: Boolean!
    message: String
    role: Role
  }

  type UserResponse implements MutationResponse {
    code: Int!
    success: Boolean!
    message: String
    user: User
    token: String
  }

  type StatusResponse implements MutationResponse {
    code: Int!
    success: Boolean!
    message: String
    status: Status
  }

  type BookResponse implements MutationResponse {
    code: Int!
    success: Boolean!
    message: String
    book: Book
  }

  # QUERY
  type Query {
    # user
    getUsers: [User]
    getUserById(uid: ID!): UserResponse

    # role
    getRoles: [Role]
  }

  # MUTATION
  type Mutation {
    # user
    createUser(
      name: String!
      lastName: String!
      nickName: String!
      password: String!
      RoleName: AllRoles!
    ): UserResponse

    updateUser(
      uid: ID
      name: String
      lastName: String
      nickName: String
      oldPassword: String
      newPassword: String
    ): UserResponse

    deleteUser(uid: ID!): UserResponse
    disableOrActiveUser(uid: ID!): UserResponse

    # book
    createBook(bookName: String!, description: String!): BookResponse

    updateBook(bookID: ID!, bookName: String, description: String): BookResponse

    deleteBook(bookID: ID!): BookResponse
    disableOrActiveBook(bookID: ID!): UserResponse

    # role
    createRole(name: AllRoles!): RoleResponse

    #status
    createStatus(statusCode: AllStatus!): StatusResponse

    # auht
    loginWhitNickNameAndPassword(
      nickName: String!
      password: String!
    ): UserResponse

    loginWhitToken(token: String!): UserResponse
  }
`
module.exports = typeDefs

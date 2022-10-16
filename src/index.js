const { ApolloServer } = require('apollo-server')
require('dotenv').config()
const {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault
} = require('apollo-server-core')
const { GraphQLError } = require('graphql')

const { connection } = require('./db')
const typeDefs = require('./definitions')
const { validateJWT } = require('./helpers/auth')
const resolvers = require('./resolvers')

connection()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  context: async ({ req, res }) => {
    const token = req.headers.authorization || ''
    const user = validateJWT(token)
    if (!user) {
      throw new GraphQLError('User is not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 400 }
        }
      })
    }
    return { user }
  },
  plugins: [
    process.env.NODE_ENV === 'prod'
      ? ApolloServerPluginLandingPageProductionDefault({ footer: false })
      : ApolloServerPluginLandingPageLocalDefault({ footer: false })
  ]
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

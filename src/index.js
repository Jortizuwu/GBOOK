const express = require('express')
const cors = require('cors')
const { json } = require('body-parser')
const { createServer } = require('http')
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault
} = require('apollo-server-core')
const {
  ApolloServerPluginDrainHttpServer
} = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
require('dotenv').config()

const { connection } = require('./db')
const typeDefs = require('./definitions')
const { validateJWT } = require('./helpers/auth')
const resolvers = require('./resolvers')

connection()

const PORT = process.env.PORT

const schema = makeExecutableSchema({ typeDefs, resolvers })
const app = express()
const httpServer = createServer(app)

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/'
})

const serverCleanup = useServer({ schema }, wsServer)

const server = new ApolloServer({
  schema,
  csrfPrevention: true,
  cache: 'bounded',
  cors: { origin: true },
  plugins: [
    process.env.NODE_ENV === 'prod'
      ? ApolloServerPluginLandingPageProductionDefault({ footer: false })
      : ApolloServerPluginLandingPageLocalDefault({ footer: false }),

    ApolloServerPluginDrainHttpServer({ httpServer }),

    {
      async serverWillStart () {
        return {
          async drainServer () {
            await serverCleanup.dispose()
          }
        }
      }
    }
  ]
})

;(async () => {
  await server.start()
  app.use(
    '/',
    cors(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || ''
        const user = validateJWT(token)
        return { user }
      }
    })
  )
  httpServer.listen(PORT, () => {
    console.log(`🚀 Query endpoint ready at http://localhost:${PORT}`)
    console.log(`🚀 Subscription endpoint ready at ws://localhost:${PORT}`)
  })
})()

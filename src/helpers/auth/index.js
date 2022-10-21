const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY

const validateJWT = (token) => {
  const user = jwt.verify(token, PRIVATE_KEY, function (err, decoded) {
    if (err) {
      return null
    }
    return decoded
  })
  return user
}

const generateJWT = (data) =>
  jwt.sign(data, PRIVATE_KEY, {
    expiresIn: '24h'
  })

const validateLogin = (user) => {
  if (!user) {
    throw new GraphQLError('User is not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 400 }
      }
    })
  }
}
module.exports = { validateJWT, generateJWT, validateLogin }

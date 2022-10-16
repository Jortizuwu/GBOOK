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

module.exports = { validateJWT, generateJWT }

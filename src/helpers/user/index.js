const bcrypt = require('bcryptjs')
const { GraphQLError } = require('graphql')
const { userModel } = require('../../models')

const validatePassword = async (old, curr) => {
  if (!(await bcrypt.compare(old, curr))) {
    throw new GraphQLError('error the password is incorret', {
      extensions: {
        code: 400
      }
    })
  }
}

const findUserById = async (uid) => {
  const user = await userModel.findByPk(uid, {
    include: [
      {
        all: true
      }
    ]
  })
  if (!user) {
    throw new GraphQLError('user not found', {
      extensions: {
        code: 'ERRORUSERIMPUT',
        http: {
          status: 401
        }
      }
    })
  }
  return user.dataValues
}

module.exports = {
  validatePassword,
  findUserById
}

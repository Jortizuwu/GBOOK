const bcrypt = require('bcryptjs')
const { GraphQLError } = require('graphql')
const { userModel, bookModel, statusModel } = require('../../models')

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
      },
      {
        model: bookModel,
        include: {
          model: statusModel
        }
      }
    ],
    attributes: {
      exclude: ['password']
    }
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

const nickNameUser = async (nickName) => {
  const user = await userModel.findOne({ where: { nickName } })
  if (user) {
    throw new GraphQLError('the nick name already in use', {
      extensions: {
        code: 'ERRORUSERIMPUT',
        http: {
          status: 401
        }
      }
    })
  }
}

module.exports = {
  validatePassword,
  findUserById,
  nickNameUser
}

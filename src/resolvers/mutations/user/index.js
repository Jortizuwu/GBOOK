const { v4: uuidv4 } = require('uuid')
const { UserInputError } = require('apollo-server')
const { GraphQLError } = require('graphql')
const bcrypt = require('bcryptjs')

const { findRoleByName, onlyAdmin } = require('../../../helpers/role')
const { userModel } = require('../../../models')
const { generateJWT } = require('../../../helpers/auth')
const { validatePassword, findUserById } = require('../../../helpers/user')

const userMutations = {
  createUser: async (data) => {
    try {
      const role = await findRoleByName(data.RoleName)
      if (!role?.roleID) throw new UserInputError('opps the role is`n valid!')

      const hash = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))

      const user = await userModel.create({
        ...data,
        uid: uuidv4(),
        roleID: role.roleID,
        password: hash
      })

      if (!user) {
        throw new GraphQLError('opps!', {
          extensions: {
            code: 'server internal error',
            http: {
              status: 500
            }
          }
        })
      }

      const { password, ...rest } = user.dataValues
      const token = generateJWT(rest)

      return {
        user,
        code: 200,
        success: true,
        message: 'user created',
        token
      }
    } catch (error) {
      return error
    }
  },
  updateUser: async (data, context) => {
    try {
      let password = null
      const user = await findUserById(context.user.uid)

      if (data.newPassword && data.oldPassword) {
        await validatePassword(data.oldPassword, user.password)
        password = bcrypt.hashSync(data.newPassword, bcrypt.genSaltSync(10))
      }

      const { uid, ...rest } = data
      await userModel.update(password ? { ...rest, password } : rest, {
        where: { uid }
      })

      return {
        code: 200,
        success: true,
        message: 'user update'
      }
    } catch (error) {
      return error
    }
  },
  deleteUser: async (data, context) => {
    try {
      onlyAdmin(context.user)
      const user = await userModel.findByPk(data.uid)
      if (!user) {
        throw new GraphQLError('user not found', {
          extensions: {
            code: 401
          }
        })
      }

      await userModel.destroy({ where: { uid: data.uid } })

      return {
        code: 200,
        success: true,
        message: 'user delete'
      }
    } catch (error) {
      return error
    }
  }
}

module.exports = userMutations
const { onlyAdmin } = require('../../../helpers/role')
const { findUserById } = require('../../../helpers/user')
const { userModel } = require('../../../models')

const userQuerys = {
  getUsers: async (context) => {
    try {
      onlyAdmin(context.user)
      const user = await userModel.findAll({
        include: [
          {
            all: true
          }
        ]
      })
      return user
    } catch (error) {
      return error
    }
  },
  getUserById: async (args) => {
    try {
      const { password, ...user } = await findUserById(args.uid)
      return {
        user,
        code: 200,
        success: true,
        message: 'user find success'
      }
    } catch (error) {
      return error
    }
  }
}

module.exports = userQuerys

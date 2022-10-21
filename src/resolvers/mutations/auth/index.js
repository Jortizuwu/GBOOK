const { UserInputError } = require('apollo-server')
const cbcrypt = require('bcryptjs')
const { generateJWT, validateJWT } = require('../../../helpers/auth')

const { userModel, statusModel, roleModel } = require('../../../models')

const authMutations = {
  loginWhitNickNameAndPassword: async (data) => {
    try {
      const user = await userModel.findOne({
        where: { nickName: data.nickName },
        include: [
          {
            model: statusModel,
            where: {
              statusCode: 'ACTIVE'
            }
          },
          {
            model: roleModel,
            attributes: ['name', 'roleID']
          }
        ]
      })

      if (!user) throw new UserInputError('the user not found or inactive')

      const hash = cbcrypt.compareSync(data.password, user.password)
      if (!hash) throw new UserInputError('the password is not valid')

      const { password, ...rest } = user.dataValues

      const token = generateJWT(rest)

      return {
        user,
        code: 200,
        success: true,
        message: `Nya hello ${user.nickName}`,
        token
      }
    } catch (error) {
      return error
    }
  },
  loginWhitToken: async (data) => {
    try {
      const value = validateJWT(data.token)

      const user = await userModel.findByPk(value.uid, {
        include: [
          {
            all: true
          }
        ]
      })
      if (!user) throw new UserInputError('the user not found')

      const { password, ...rest } = user.dataValues

      const token = generateJWT(rest)

      return {
        user,
        code: 200,
        success: true,
        message: `Nya hello ${user.nickName}`,
        token
      }
    } catch (error) {
      return error
    }
  }
}

module.exports = authMutations

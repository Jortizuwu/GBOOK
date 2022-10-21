const { GraphQLError } = require('graphql')
const { v4: uuidv4 } = require('uuid')
const { validateLogin } = require('../../../helpers/auth')
const { onlyAdmin } = require('../../../helpers/role')

const { findStatusByCode } = require('../../../helpers/status')
const { statusModel } = require('../../../models')

const statusMutations = {
  createStatus: async (args, context) => {
    try {
      validateLogin(context.user)
      onlyAdmin(context.user)

      const data = await findStatusByCode(args.statusCode)
      if (data) throw new GraphQLError('the status code it`s already created')

      const status = await statusModel.create({ ...args, statusID: uuidv4() })
      return {
        code: 200,
        success: true,
        message: 'status created',
        status
      }
    } catch (error) {
      return error
    }
  }
}

module.exports = statusMutations

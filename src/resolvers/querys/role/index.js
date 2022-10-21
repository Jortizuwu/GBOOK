const { validateLogin } = require('../../../helpers/auth')
const { onlyAdmin } = require('../../../helpers/role')
const { roleModel } = require('../../../models')

const roleQuerys = {
  getRoles: async (context) => {
    validateLogin(context.user)
    onlyAdmin(context.user)
    return await roleModel.findAll()
  }
}

module.exports = roleQuerys

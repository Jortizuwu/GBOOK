const { onlyAdmin } = require('../../../helpers/role')
const { roleModel } = require('../../../models')

const roleQuerys = {
  getRoles: async (context) => {
    onlyAdmin(context.user)
    return await roleModel.findAll()
  }
}

module.exports = roleQuerys

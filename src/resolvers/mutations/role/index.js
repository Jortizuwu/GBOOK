const { v4: uuidv4 } = require('uuid')
const { roleModel } = require('../../../models')

const roleMutations = {
  createRole: async (data) => {
    const role = await roleModel.create({ ...data, roleID: uuidv4() })

    if (!role) throw new Error('opps!')

    return {
      role,
      code: 200,
      success: true,
      message: 'role created '
    }
  }
}

module.exports = roleMutations

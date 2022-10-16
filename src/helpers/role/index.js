const { GraphQLError } = require('graphql')
const { roleModel } = require('../../models')

const findRoleByName = async (name) => {
  const value = await roleModel.findOne({
    where: { name: name.toUpperCase() }
  })

  return value
}

const onlyAdmin = (user) => {
  if (user.Role.name !== 'ADMIN') {
    throw new GraphQLError('You are not authorized to perform this action.', {
      extensions: {
        code: 'FORBIDDEN',
        http: {
          status: 400
        }
      }
    })
  }
}

module.exports = {
  findRoleByName,
  onlyAdmin
}

const { GraphQLError } = require('graphql')
const { contentModel } = require('../../models')

const findContentById = async (contentID) => {
  const content = await contentModel.findByPk(contentID, {
    include: [
      {
        all: true
      }
    ]
  })
  if (!content) {
    throw new GraphQLError('content not found', {
      extensions: {
        code: 'ERRORUSERIMPUT',
        http: {
          status: 401
        }
      }
    })
  }
  return content.dataValues
}

module.exports = {
  findContentById
}

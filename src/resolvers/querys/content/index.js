const { onlyAdmin } = require('../../../helpers/role')
const { findContentById } = require('../../../helpers/content')
const { contentModel, userModel } = require('../../../models')
const { validateLogin } = require('../../../helpers/auth')

const contentQuerys = {
  getContents: async (context) => {
    try {
      validateLogin(context.user)
      onlyAdmin(context.user)
      const contents = await contentModel.findAll({
        include: [
          {
            all: true
          },
          {
            model: userModel,
            attributes: {
              exclude: ['password']
            }
          }
        ]
      })

      return contents
    } catch (error) {
      return error
    }
  },
  getContentById: async (args) => {
    try {
      const content = await findContentById(args.contentID)
      return {
        content,
        code: 200,
        success: true,
        message: 'content find success'
      }
    } catch (error) {
      return error
    }
  }
}

module.exports = contentQuerys

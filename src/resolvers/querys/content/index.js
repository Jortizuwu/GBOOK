// const { onlyAdmin } = require('../../../helpers/role')
const { findContentById } = require('../../../helpers/content')
const { contentModel } = require('../../../models')

const bookQuerys = {
  getContents: async (context) => {
    try {
      // onlyAdmin(context.user)
      const contents = await contentModel.findAll({
        include: [
          {
            all: true
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

module.exports = bookQuerys

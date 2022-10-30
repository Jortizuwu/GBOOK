const { onlyAdmin } = require('../../../helpers/role')
const { findBookById } = require('../../../helpers/book')
const { bookModel, contentModel, userModel } = require('../../../models')
const { validateLogin } = require('../../../helpers/auth')

const bookQuerys = {
  getBooks: async (context) => {
    try {
      validateLogin(context.user)
      onlyAdmin(context.user)
      const books = await bookModel.findAll({
        include: [
          {
            all: true
          },
          {
            model: contentModel,
            include: [
              {
                all: true
              }
            ]
          },
          {
            model: userModel,
            attributes: {
              exclude: ['password']
            }
          }
        ]
      })

      return books
    } catch (error) {
      return error
    }
  },
  getBookById: async (args) => {
    try {
      const book = await findBookById(args.bookID)
      return {
        book,
        code: 200,
        success: true,
        message: 'book find success'
      }
    } catch (error) {
      return error
    }
  }
}

module.exports = bookQuerys

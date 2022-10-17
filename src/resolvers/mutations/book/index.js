const { UserInputError } = require('apollo-server')
const { GraphQLError } = require('graphql')
const { v4: uuidv4 } = require('uuid')

const { findBookById } = require('../../../helpers/book')
const { onlyAdmin } = require('../../../helpers/role')
const { findStatusByCode } = require('../../../helpers/status')
const { bookModel } = require('../../../models')

const bookMutations = {
  createBook: async (data, context) => {
    try {
      const status = await findStatusByCode('ACTIVE')

      if (!status?.statusID) throw new GraphQLError('the status is`n valid')

      const book = await bookModel.create({
        ...data,
        bookID: uuidv4(),
        uid: context.user.uid,
        statusID: status.statusID
      })

      return {
        book,
        code: 200,
        success: true,
        message: 'book created'
      }
    } catch (error) {
      return error
    }
  },
  updateBook: async (data, context) => {
    try {
      await findBookById(data.bookID)

      await bookModel.update(
        { ...data },
        { where: { bookID: data.bookID, uid: context.user.uid } }
      )

      return {
        code: 200,
        success: true,
        message: 'book updated'
      }
    } catch (error) {
      return error
    }
  },
  deleteBook: async (data, context) => {
    try {
      onlyAdmin(context.user)
      await bookModel.destroy({ where: { bookID: data.bookID } })

      return {
        code: 200,
        success: true,
        message: 'book created'
      }
    } catch (error) {
      return error
    }
  },
  disableOrActiveBook: async (data, context) => {
    try {
      const book = await findBookById(data.bookID)

      const status = await findStatusByCode(
        book.Status.statusCode === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
      )
      if (!status?.statusID) {
        throw new UserInputError('opps!! the status code is`n valid!')
      }

      await bookModel.update(
        { statusID: status.statusID },
        { where: { bookID: data.bookID, uid: context.user.uid } }
      )

      return {
        code: 200,
        success: true,
        message: `book ${
          book.Status.statusCode === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
        }`
      }
    } catch (error) {
      return error
    }
  }
}

module.exports = bookMutations

const { GraphQLError } = require('graphql')
const {
  bookModel,
  statusModel,
  userModel,
  contentModel
} = require('../../models')

const findBookById = async (bookID) => {
  const book = await bookModel.findByPk(bookID, {
    include: [
      {
        all: true
      },
      {
        model: statusModel,
        where: {
          statusCode: 'ACTIVE'
        }
      },
      {
        model: userModel,
        attributes: {
          exclude: ['password']
        }
      },
      {
        model: contentModel,
        include: [
          {
            model: userModel,
            attributes: {
              exclude: ['password']
            }
          }
        ]
      }
    ],
    order: [[contentModel, 'createdAt', 'ASC']]
  })
  if (!book) {
    throw new GraphQLError('book not found or disabled', {
      extensions: {
        code: 'ERRORUSERIMPUT',
        http: {
          status: 401
        }
      }
    })
  }
  return book.dataValues
}

module.exports = {
  findBookById
}

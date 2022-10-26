const { GraphQLError } = require('graphql')
const { v4: uuidv4 } = require('uuid')

const { validateLogin } = require('../../../helpers/auth')
const { findBookById } = require('../../../helpers/book')
const { contentModel } = require('../../../models')

const contentMutations = {
  createContent: async (data, context, pubSub) => {
    try {
      validateLogin(context.user)
      await findBookById(data.bookID)

      const user = await contentModel.findOne({
        where: { bookID: data.bookID, uid: context.user.uid }
      })

      if (user) {
        throw new GraphQLError(
          'sorry but you can only add one piece content per book'
        )
      }

      const content = await contentModel.create({
        ...data,
        contentID: uuidv4(),
        uid: context.user.uid
      })

      pubSub.publish('CONTENT_ADD', { contentAdd: content.dataValues })

      return {
        code: 200,
        success: true,
        message: 'content add to book thank`s',
        content
      }
    } catch (error) {
      return error
    }
  }
}

module.exports = contentMutations

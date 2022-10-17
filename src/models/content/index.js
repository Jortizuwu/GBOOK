const { DataTypes } = require('sequelize')
const { dbconfig } = require('../../db')

const Content = dbconfig.define(
  'Content',
  {
    contentID: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    content: {
      type: DataTypes.STRING(1000),
      allowNull: false
    }
  },
  {
    tableName: 'content'
  }
)
module.exports = Content

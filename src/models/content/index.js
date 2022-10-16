const { DataTypes } = require('sequelize')
const { dbconfig } = require('../../db')

const Content = dbconfig.define(
  'Content',
  {
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

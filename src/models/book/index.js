const { DataTypes } = require('sequelize')
const { dbconfig } = require('../../db')

const Book = dbconfig.define(
  'Book',
  {
    bookID: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    bookName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'book'
  }
)
module.exports = Book

const { DataTypes } = require('sequelize')
const { dbconfig } = require('../../db')

const Status = dbconfig.define(
  'Status',
  {
    statusID: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    statusCode: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    }
  },
  {
    tableName: 'status'
  }
)
module.exports = Status

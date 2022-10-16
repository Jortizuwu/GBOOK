const { DataTypes } = require('sequelize')
const { dbconfig } = require('../../db')

const Role = dbconfig.define(
  'Role',
  {
    roleID: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  },
  {
    tableName: 'role'
  }
)
module.exports = Role

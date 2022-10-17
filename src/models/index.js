const userModel = require('./user')
const roleModel = require('./role')
const statusModel = require('./status')
const contentModel = require('./content')
const bookModel = require('./book')

// role user
roleModel.hasMany(userModel, {
  foreignKey: {
    name: 'roleID'
  }
})
userModel.belongsTo(roleModel, {
  foreignKey: {
    name: 'roleID'
  }
})

// status user
statusModel.hasMany(userModel, {
  foreignKey: {
    name: 'statusID'
  }
})
userModel.belongsTo(statusModel, {
  foreignKey: {
    name: 'statusID'
  }
})

// user book
userModel.hasMany(bookModel, {
  foreignKey: {
    name: 'uid'
  }
})
bookModel.belongsTo(userModel, {
  foreignKey: {
    name: 'uid'
  }
})

// book status
statusModel.hasMany(bookModel, {
  foreignKey: {
    name: 'statusID'
  }
})
bookModel.belongsTo(statusModel, {
  foreignKey: {
    name: 'statusID'
  }
})

// user content
userModel.hasMany(contentModel, {
  foreignKey: {
    name: 'uid'
  }
})
contentModel.belongsTo(userModel, {
  foreignKey: {
    name: 'uid'
  }
})

// book content
bookModel.hasMany(contentModel, {
  foreignKey: { name: 'bookID' }
})

contentModel.belongsTo(bookModel, {
  foreignKey: { name: 'bookID' }
})

module.exports = {
  userModel,
  roleModel,
  bookModel,
  contentModel,
  statusModel
}

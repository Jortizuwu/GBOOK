const { statusModel } = require('../../models')

const findStatusByCode = async (statusCode) => {
  const dataValues = await statusModel.findOne({
    where: { statusCode }
  })
  return dataValues
}

module.exports = {
  findStatusByCode
}

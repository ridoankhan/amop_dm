const UserModel = require('./user.model')

async function createUser(userData) {
  return UserModel.create(userData)
}

async function getUserById(userId) {
  return UserModel.findById(userId).exec()
}

async function updateUser(userId, updatedData) {
  return UserModel.findByIdAndUpdate(userId, updatedData, { new: true }).exec()
}

async function deleteUser(userId) {
  return UserModel.findByIdAndDelete(userId).exec()
}

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
}

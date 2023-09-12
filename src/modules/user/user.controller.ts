const UserService = require('./user.service')
const userService = new UserService()

async function createUser(userData) {
  return await userService.createUser(userData)
}

async function getUserById(userId) {
  return await userService.getUserById(userId)
}

async function updateUser(userId, updatedData) {
  return await userService.updateUser(userId, updatedData)
}

async function deleteUser(userId) {
  return await userService.deleteUser(userId)
}

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
}

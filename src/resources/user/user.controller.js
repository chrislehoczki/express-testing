const uuidv4 = require("uuid/v4")

let users = []

const getUserIndex = id => users.findIndex(user => user.id === id)
export const getUserById = id => users.find(user => user.id === id)
export const resetUsers = () => (users = [])

export const loadUsers = userArray => {
  userArray.forEach(addUser)
}

export const getUsers = () => users

export const addUser = user => {
  const userWithId = { ...user, id: uuidv4() }
  users.push(userWithId)
  return userWithId
}

export const updateUser = updatedUser => {
  const currentUserIndex = getUserIndex(updatedUser.id)
  users[currentUserIndex] = { ...users[currentUserIndex], ...updatedUser }
}

export const deleteUser = ({ id }) => {
  const userToBeDeletedIndex = getUserIndex(id)
  users.splice(userToBeDeletedIndex, 1)
}

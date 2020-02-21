let users = []

export const resetUsers = () => (users = [])

export const loadUsers = userArray => {
  userArray.forEach(addUser)
}

export const getUsers = () => users

export const addUser = user => users.push(user)

export const updateUser = updatedUser => {
  const currentUserIndex = users.findIndex(user => user.id === updatedUser.id)

  users[currentUserIndex] = { ...users[currentUserIndex], ...updatedUser }
}

let users = []

export const resetUsers = () => (users = [])
export const loadUsers = userArray => {
  userArray.forEach(addUser)
}
export const getUsers = () => users
export const addUser = user => users.push(user)

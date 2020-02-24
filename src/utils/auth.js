import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

import config from "../config"
import {
  addUser,
  getUserById,
  getUserByProperty
} from "../resources/user/user.controller"

export const newToken = (user, expiresIn = config.secrets.jwtExp) => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn
  })
}

export const verifyToken = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, decoded) => {
      if (err) reject(err)
      const user = getUserById(decoded.id)
      resolve(user)
    })
  })
}

export const signup = async (req, res, next) => {
  const { username, password } = req.body
  if (!username || !password) {
    next("Username and password must be provided")
  }
  try {
    const hash = await bcrypt.hash(password, 8)
    const user = {
      username,
      password: hash
    }
    const addedUser = addUser(user)
    const token = newToken(addedUser)
    res.status(201).send({ token })
  } catch (e) {
    next("Error creating user")
  }
}

export const signin = async (req, res, next) => {
  const { username, password } = req.body
  if (!username || !password) {
    next("Username and password must be provided")
  }
  const user = getUserByProperty("username", username)
  if (!user) {
    next("No user found with that username")
  }
  try {
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      next("Password provided is incorrect")
    }
    const token = newToken(user)
    res.status(200).send({ token })
  } catch (e) {
    next("Error authenticating user")
  }
}

export const protect = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end()
  }
  if (req.headers.authorization.slice(0, 6) !== "Bearer") {
    return res.status(401).end()
  }
  const token = req.headers.authorization.replace("Bearer ", "")
  const user = await verifyToken(token)
  if (!user) {
    return res.status(401).end()
  }
  req.user = { ...user, password: null }
  next()
}

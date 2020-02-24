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

export const signup = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res
      .status(400)
      .send({ Error: "Username and password must be provided" })
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
    console.log(`<<<<<<<<<<<<< Error: ${e}`)
    res.status(400).send({ Error: "Error creating user" })
  }
}

export const signin = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res
      .status(400)
      .send({ Error: "Username and password must be provided" })
  }
  const user = getUserByProperty("username", username)
  if (!user) {
    return res.status(404).send({ Error: "No user found with that username" })
  }
  try {
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(401).send({ Error: "Password provided is incorrect" })
    }
    const token = newToken(user)
    res.status(200).send({ token })
  } catch (e) {
    console.log(`<<<<<<<<<<<<< Error: ${e}`)
    res.status(400).send({ Error: "Error authenticating user" })
  }
}

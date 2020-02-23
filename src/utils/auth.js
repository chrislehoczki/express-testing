import config from "../config"
import jwt from "jsonwebtoken"

export const newToken = (user, expiresIn = config.secrets.jwtExp) => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn
  })
}

export const verifyToken = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, decoded) => {
      if (err) reject(err)
      resolve(decoded)
    })
  })
}

import express from "express"
import { getUsers, addUser, updateUser } from "./user.controller.js"
const userRouter = express.Router()

userRouter
  .route("/")
  .get((req, res) => res.status(200).json(getUsers()))
  .post((req, res) => {
    addUser(req.body)
    res.status(200).send({ status: "OK" })
  })
  .put((req, res) => {
    updateUser(req.body)
    res.status(200).send({ status: "OK" })
  })

export default userRouter

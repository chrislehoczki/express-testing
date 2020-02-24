import express from "express"
import {
  getUsers,
  updateUser,
  deleteUser,
  getUserById
} from "./user.controller.js"
import { protect } from "../../utils/auth"
const userRouter = express.Router()

userRouter
  .route("/")
  .get((req, res) => res.status(200).json(getUsers()))
  .put(protect, (req, res) => {
    const id = req.user.id
    updateUser({ ...req.body, id })
    res.status(200).send({ status: "OK" })
  })
  .delete(protect, (req, res) => {
    const id = req.user.id
    deleteUser({ id, ...req.body })
    res.status(200).send({ status: "OK" })
  })

userRouter.route("/:id").get((req, res) => {
  const id = req.params.id
  const user = getUserById(id)
  res.status(200).json(user)
})

export default userRouter

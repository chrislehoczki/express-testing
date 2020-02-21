import express from "express"

const userRouter = express.Router()

userRouter.route("/").get((req, res) => {
  res.json({ id: "12345" })
})

export default userRouter

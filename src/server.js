import express from "express"
import { json, urlencoded } from "body-parser"
import morgan from "morgan"

import userRouter from "./resources/user/user.router"

const port = 3000
export const app = express()

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan("dev"))

app.use("/user", userRouter)

export const start = () => {
  app.listen(port, () => {
    console.log(`Express server running on port ${port}`)
  })
}

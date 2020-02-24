import express from "express"
import { json, urlencoded } from "body-parser"
import morgan from "morgan"

import config from "./config"

import userRouter from "./resources/user/user.router"

export const app = express()

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan("dev"))

app.get("/", (req, res) => res.send("Jenkins Deployment Complete"))
app.use("/user", userRouter)

export const start = () => {
  app.listen(config.port, () => {
    console.log(`Express server running on port ${config.port}`)
  })
}

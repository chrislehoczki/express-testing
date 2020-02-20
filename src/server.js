import express from "express"
import cors from "cors"
import { json, urlencoded } from "body-parser"
import morgan from "morgan"

const port = 3000
const app = express()

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan("dev"))

app.listen(port, () => {
  console.log(`Express server running on port ${port}`)
})

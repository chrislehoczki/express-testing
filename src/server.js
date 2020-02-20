import express from "express"
import cors from "cors"
import { json, urlencoded } from "body-parser"

const port = 3000
const app = express()

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))

app.listen(port, () => {
  console.log(`Express server running on port ${port}`)
})

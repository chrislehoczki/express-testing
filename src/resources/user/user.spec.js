import { app } from "../../server"
const request = require("supertest")

describe("userRouter", () => {
  it("Should return 200 and json sample for /user", () => {
    request(app)
      .get("/user")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err
        expect(res.body.id).toBeDefined()
      })
  })
})

import jwt from "jsonwebtoken"
import config from "../config"
import { newToken, verifyToken } from "./auth"

const user = {
  id: 0,
  name: "Chris"
}
describe.only("auth", () => {
  describe("newToken", () => {
    it("Creates a json web token with a user id correctly encoded", done => {
      const token = newToken(user)
      expect(token).toBeDefined()
      jwt.verify(token, config.secrets.jwt, (err, decoded) => {
        expect(err).toBeNull()
        expect(decoded.id).toEqual(user.id)
        done()
      })
    })
  })
  describe("verifyToken", () => {
    it("It should verify a correctly encoded token", async done => {
      const token = newToken(user)
      const decoded = await verifyToken(token)
      expect(decoded.id).toEqual(user.id)
      done()
    })
  })
})

import jwt from "jsonwebtoken"
import config from "../config"
import { newToken } from "./auth"

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
})

import jwt from "jsonwebtoken"
import config from "../config"
import { newToken, verifyToken, signup, signin } from "./auth"
import {
  getUsers,
  loadUsers,
  resetUsers,
  addUser
} from "../resources/user/user.controller"

const mockUsers = [{ username: "Chris" }, { username: "John" }]

describe.only("auth", () => {
  beforeEach(() => {
    loadUsers(mockUsers)
  })
  describe("newToken", () => {
    it("Creates a json web token with a user id correctly encoded", done => {
      const token = newToken(getUsers()[0])
      expect(token).toBeDefined()
      jwt.verify(token, config.secrets.jwt, (err, decoded) => {
        expect(err).toBeNull()
        expect(decoded.id).toEqual(getUsers()[0].id)
        done()
      })
    })
  })
  describe("verifyToken", () => {
    it("It should verify a correctly encoded token and return the user", async done => {
      const token = newToken(getUsers()[0])
      const payload = await verifyToken(token)
      expect(payload).toHaveProperty("id", getUsers()[0].id)
      done()
    })
  })
  describe("signup", () => {
    it("requires email and password", async () => {
      expect.assertions(2)
      const req = { body: {} }
      const res = {
        status(status) {
          expect(status).toBe(400)
          return this
        },
        send(result) {
          expect(typeof result.Error).toBe("string")
        }
      }

      await signup(req, res)
    })

    it("creates user and and sends new token", async () => {
      expect.assertions(3)
      const req = { body: { username: "Chris", password: "293jssh" } }
      const res = {
        status(status) {
          expect(status).toBe(201)
          return this
        },
        async send(result) {
          const user = await verifyToken(result.token)
          expect(user.username).toBe("Chris")
          expect(getUsers()).toHaveLength(3)
        }
      }

      await signup(req, res)
    })
  })
  describe("signin", () => {
    beforeEach(async () => {
      const req1 = { body: { username: "James", password: "293jssh" } }
      const res1 = {
        status(status) {
          return this
        },
        async send(result) {}
      }
      await signup(req1, res1)
    })
    it("requires email and password", async () => {
      expect.assertions(2)
      const req = { body: {} }
      const res = {
        status(status) {
          expect(status).toBe(400)
          return this
        },
        send(result) {
          expect(typeof result.Error).toBe("string")
        }
      }

      await signin(req, res)
    })

    it("sends error if no user found", async () => {
      expect.assertions(2)
      const req = { body: { username: "nouser", password: "293jssh" } }
      const res = {
        status(status) {
          expect(status).toBe(404)
          return this
        },
        async send(result) {
          expect(typeof result.Error).toBe("string")
        }
      }

      await signin(req, res)
    })
    it("sends error if no password match", async () => {
      expect.assertions(2)
      const req = { body: { username: "James", password: "wrong password" } }
      const res = {
        status(status) {
          expect(status).toBe(401)
          return this
        },
        async send(result) {
          expect(typeof result.Error).toBe("string")
        }
      }

      await signin(req, res)
    })
    it("returns token if password matches", async () => {
      expect.assertions(2)
      const req = { body: { username: "James", password: "293jssh" } }
      const res = {
        status(status) {
          expect(status).toBe(200)
          return this
        },
        async send(result) {
          expect(result).toHaveProperty("token")
        }
      }

      await signin(req, res)
    })
  })
  afterEach(() => {
    resetUsers()
  })
})

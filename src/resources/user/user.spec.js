import { app } from "../../server"
import { getUsers, addUser, loadUsers, resetUsers } from "./user.controller"
import { newToken } from "../../utils/auth"
const request = require("supertest")

const mockUsers = [{ username: "Chris" }, { username: "John" }]
const newUser = { username: "Judit" }
const updateUser = { username: "Paul" }

let token

describe("userController", () => {
  beforeEach(() => {
    loadUsers(mockUsers)
  })
  it("getUser returns current users", () => {
    expect(getUsers()).toHaveLength(2)
  })
  it("addUser adds user to the db", () => {
    addUser(newUser)
    expect(getUsers()).toHaveLength(3)
  })
  afterEach(() => {
    resetUsers()
  })
})

describe("userRouter", () => {
  beforeEach(() => {
    loadUsers(mockUsers)
    const user = addUser({ username: "ishmail" })
    token = `Bearer ${newToken({ id: user.id })}`
  })

  it("GET /user returns current users", done => {
    request(app)
      .get("/user")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err
        expect(res.body).toHaveLength(3)
        done()
      })
  })
  it("GET /user/:id returns single user", done => {
    request(app)
      .get(`/user/${getUsers()[0].id}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err
        expect(typeof res.body).toBe("object")
        expect(res.body.id).toEqual(getUsers()[0].id)
        done()
      })
  })
  it("PUT /user updates a user in the database", done => {
    request(app)
      .put("/user")
      .set("Authorization", token)
      .send({ ...updateUser })
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err
        expect(res.body).toEqual({ status: "OK" })
        expect(getUsers()).toHaveLength(3)
        expect(getUsers()[2].username).toEqual("Paul")
        done()
      })
  })

  it("DELETE /user deletes a user from the database", done => {
    request(app)
      .delete("/user")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err
        expect(res.body).toEqual({ status: "OK" })
        expect(getUsers()).toHaveLength(2)
        done()
      })
  })

  afterEach(() => {
    resetUsers()
  })
})

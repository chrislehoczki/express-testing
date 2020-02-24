import { app } from "../../server"
import { getUsers, addUser, loadUsers, resetUsers } from "./user.controller"

const request = require("supertest")

const mockUsers = [{ username: "Chris" }, { username: "John" }]
const newUser = { username: "Judit" }
const updateUser = { username: "Paul" }

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
  })

  it("GET /user returns current users", done => {
    request(app)
      .get("/user")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err
        expect(res.body).toHaveLength(2)
        done()
      })
  })

  it("POST /user adds a user to the database", done => {
    request(app)
      .post("/user")
      .send(newUser)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err
        expect(res.body).toEqual({ status: "OK" })
        expect(getUsers()).toHaveLength(3)
        expect(getUsers()[2].username).toEqual("Judit")
        done()
      })
  })

  it("PUT /user updates a user in the database", done => {
    request(app)
      .put("/user")
      .send({ ...updateUser, id: getUsers()[1].id })
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err
        expect(res.body).toEqual({ status: "OK" })
        expect(getUsers()).toHaveLength(2)
        expect(getUsers()[1].username).toEqual("Paul")
        done()
      })
  })

  it("DELETE /user deletes a user from the database", done => {
    request(app)
      .delete("/user")
      .send({ id: getUsers()[0].id })
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err
        expect(res.body).toEqual({ status: "OK" })
        expect(getUsers()).toHaveLength(1)
        expect(getUsers()[0].username).toEqual("John")
        done()
      })
  })

  afterEach(() => {
    resetUsers()
  })
})

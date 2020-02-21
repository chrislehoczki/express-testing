import { app } from "../../server"
import { getUsers, addUser, loadUsers, resetUsers } from "./user.controller"

const request = require("supertest")

const mockUsers = [
  { id: 0, name: "Chris" },
  { id: 1, name: "John" }
]
const newUser = { id: 2, name: "Judit" }
const updateUser = { id: 1, name: "Paul" }

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
  /* eslint-disable */
  it("GET /user returns current users", done => {
    request(app)
      .get("/user")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, res) {
        console.log(res.body)
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
        expect(getUsers()[2].name).toEqual("Judit")
        done()
      })
  })

  it("PUT /user updates a user in the database", done => {
    request(app)
      .put("/user")
      .send(updateUser)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err
        expect(res.body).toEqual({ status: "OK" })
        expect(getUsers()).toHaveLength(2)
        expect(getUsers()[1].name).toEqual("Paul")
        done()
      })
  })

  afterEach(() => {
    resetUsers()
  })
})

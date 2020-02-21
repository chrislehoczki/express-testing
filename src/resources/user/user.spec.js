import { app } from "../../server"
import { getUsers, addUser, loadUsers, resetUsers } from "./user.controller"

const request = require("supertest")

const mockUsers = [
  { id: 0, name: "Chris" },
  { id: 1, name: "John" }
]
const newUser = { id: 2, name: "Judit" }

describe("userController", () => {
  beforeEach(() => {
    loadUsers(mockUsers)
  })
  it("getUser returns current users", () => {
    expect(getUsers().length).toEqual(2)
  })
  it("addUser adds user to the db", () => {
    addUser(newUser)
    expect(getUsers().length).toEqual(3)
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
        expect(res.body.length).toEqual(2)
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
        expect(getUsers().length).toEqual(3)
        expect(getUsers()[2].name).toEqual("Judit")
        done()
      })
  })
  afterEach(() => {
    resetUsers()
  })
})

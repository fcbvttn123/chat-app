const jwt = require("jsonwebtoken")
const AccountCollection = require("../models/user")

function createToken(_id) {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" })
}

function loginUser(req, res) {
  res.json({
    event: "Login User",
    email: "abc@gmail.com",
    password: "password",
  })
}

async function registerUser(req, res) {
  const { username, password } = req.body
  try {
    const account = await AccountCollection.signup(username, password)
    const token = createToken(account._id)
    res.status(200).json({ username, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  loginUser,
  registerUser,
}

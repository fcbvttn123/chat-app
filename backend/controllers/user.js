const AccountCollection = require("../models/user")
const { createToken } = require("../utils/functions")

async function loginUser(req, res) {
  const { username, password } = req.body
  try {
    const account = await AccountCollection.login(username, password)
    const token = createToken(account._id)
    res.status(200).json({ username, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
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

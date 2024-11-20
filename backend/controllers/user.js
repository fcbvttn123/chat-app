const AccountCollection = require("../models/user")
const { createToken } = require("../utils/functions")
const jwt = require("jsonwebtoken")

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

async function verifyToken(req, res) {
  // verify user is authenticated
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" })
  }

  const token = authorization.split(" ")[1]

  try {
    const { _id } = jwt.verify(token, process.env.SECRET)
    // The select() function will only return the id of the document instead of the whole document
    req.user = await AccountCollection.findOne({ _id }).select("_id")
    res.status(200).json({ status: "Valid Token" })
  } catch (error) {
    console.log(error)
    res.status(401).json({ error: "Invalid Token" })
  }
}

module.exports = {
  loginUser,
  registerUser,
  verifyToken,
}

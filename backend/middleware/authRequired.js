const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" })
  }

  const token = authorization.split(" ")[1]

  try {
    const { _id } = jwt.verify(token, process.env.SECRET)
    // The select() function will only return the id of the document instead of the whole document
    req.user = await User.findOne({ _id }).select("_id")
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ error: "Invalid Token" })
  }
}

module.exports = requireAuth

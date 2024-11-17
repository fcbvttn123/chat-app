const jwt = require("jsonwebtoken")

function createToken(_id) {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" })
}

module.exports = {
  createToken,
}

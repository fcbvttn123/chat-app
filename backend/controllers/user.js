function loginUser(req, res) {
  res.json({
    event: "Login User",
    email: "abc@gmail.com",
    password: "password",
  })
}

function registerUser(req, res) {
  res.json({
    event: "Register User",
    email: "abc@gmail.com",
    password: "password",
  })
}

module.exports = {
  loginUser,
  registerUser,
}

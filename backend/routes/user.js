const express = require("express")
const router = express.Router()
const { loginUser, registerUser, verifyToken } = require("../controllers/user")

router.post("/login", loginUser)
router.post("/register", registerUser)
router.post("/verifyToken", verifyToken)

module.exports = router

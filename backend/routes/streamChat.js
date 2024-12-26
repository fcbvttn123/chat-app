const express = require("express")
const router = express.Router()
const { createStreamChatToken } = require("../controllers/streamChat")

router.post("/createStreamChatToken", createStreamChatToken)

module.exports = router

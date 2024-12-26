const StreamChat = require("stream-chat").StreamChat
const serverClient = StreamChat.getInstance(
  process.env.STREAM_CHAT_API_KEY,
  process.env.STREAM_CHAT_API_SECRET
)

async function createStreamChatToken(req, res) {
  const { username } = req.body
  try {
    const token = serverClient.createToken(username)
    res.status(200).json({ streamChatToken: token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  createStreamChatToken,
}

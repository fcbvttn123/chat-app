import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import {
  useCreateChatClient,
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
  ChannelList,
} from "stream-chat-react"
import "stream-chat-react/dist/css/v2/index.css"
import { callPostAPI } from "../utils/functions"

export function ChatPage() {
  const { username } = useContext(AuthContext)
  const [streamChatToken, setStreamChatToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const client = useCreateChatClient({
    apiKey: import.meta.env.VITE__STREAM_CHAT_API_KEY,
    tokenOrProvider: streamChatToken,
    userData: { id: username },
  })

  useEffect(() => {
    async function getStreamChatToken(username) {
      if (username) {
        const response = await callPostAPI("/api/auth/createStreamChatToken", {
          username,
        })
        if (response?.error) {
          setError(response?.error)
        } else {
          setStreamChatToken(response?.streamChatToken)
        }
      }
      setLoading(false)
    }
    getStreamChatToken(username)
  }, [username])

  if (loading || !client) return <div>Setting up client & connection...</div>
  if (error) return <div>{error}</div>
  return (
    <div className="flex h-full">
      <Chat client={client}>
        <ChannelList
          filters={{
            type: "messaging",
            members: { $in: [username] },
          }}
          sort={{ last_message_at: -1 }}
          options={{
            limit: 10,
          }}
        />
        <Channel>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  )
}

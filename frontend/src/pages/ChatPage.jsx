// Imports for React
import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { callPostAPI } from "../utils/functions"
// Imports for StreamChat
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
  useComponentContext,
} from "stream-chat-react"
import "stream-chat-react/dist/css/v2/index.css"
import { ChannelPreviewActionButtons as DefaultChannelPreviewActionButtons } from "stream-chat-react"
import clsx from "clsx"

function CustomListItem(props) {
  const {
    active,
    Avatar = DefaultAvatar,
    channel,
    className: customClassName = "",
    displayImage,
    displayTitle,
    groupChannelDisplayInfo,
    latestMessagePreview,
    onSelect: customOnSelectChannel,
    setActiveChannel,
    unread,
    watchers,
  } = props

  const { ChannelPreviewActionButtons = DefaultChannelPreviewActionButtons } =
    useComponentContext()

  const channelPreviewButton = useRef(null)

  const avatarName =
    displayTitle ||
    channel.state.messages[channel.state.messages.length - 1]?.user?.id

  function onSelectChannel(e) {
    if (customOnSelectChannel) {
      customOnSelectChannel(e)
    } else if (setActiveChannel) {
      setActiveChannel(channel, watchers)
    }
    if (channelPreviewButton?.current) {
      channelPreviewButton.current.blur()
    }
  }

  return (
    <div className="str-chat__channel-preview-container">
      <ChannelPreviewActionButtons channel={channel} />
      <button
        aria-label={`Select Channel: ${displayTitle || ""}`}
        aria-selected={active}
        className={clsx(
          `str-chat__channel-preview-messenger str-chat__channel-preview`,
          active && "str-chat__channel-preview-messenger--active",
          unread &&
            unread >= 1 &&
            "str-chat__channel-preview-messenger--unread",
          customClassName
        )}
        data-testid="channel-preview-button"
        onClick={onSelectChannel}
        ref={channelPreviewButton}
        role="option"
      >
        <div className="str-chat__channel-preview-messenger--left">
          <Avatar
            className="str-chat__avatar--channel-preview"
            groupChannelDisplayInfo={groupChannelDisplayInfo}
            image={displayImage}
            name={avatarName}
          />
        </div>
        <div className="str-chat__channel-preview-end">
          <div className="str-chat__channel-preview-end-first-row">
            <div className="str-chat__channel-preview-messenger--name">
              <span>{displayTitle}</span>
            </div>
            {!!unread && (
              <div
                className="str-chat__channel-preview-unread-badge"
                data-testid="unread-badge"
              >
                {unread}
              </div>
            )}
          </div>
          <div className="str-chat__channel-preview-messenger--last-message">
            {latestMessagePreview}
          </div>
        </div>
      </button>
    </div>
  )
}

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
          Preview={CustomListItem}
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

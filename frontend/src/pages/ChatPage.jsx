import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export function ChatPage() {
  const { username } = useContext(AuthContext)
  console.log(username)
  return (
    <div>
      <h1>Chat Page</h1>
    </div>
  )
}

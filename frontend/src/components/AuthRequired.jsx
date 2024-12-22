import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"

export function AuthRequired() {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  useEffect(() => {
    async function verifyToken(token) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE__BACKEND_URL}/api/auth/verifyToken`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()
        if (data.status == "Valid Token") {
          setAuthenticated(true)
          setLoading(false)
        }
      } catch (error) {
        setLoading(false)
        console.log(error.message)
      }
    }
    let token = JSON.parse(
      localStorage.getItem("REACT_CHAT_APP_V3_USER_TOKEN")
    )?.token
    verifyToken(token)
  }, [])
  if (loading) {
    return <div>Loading...</div>
  }
  if (!authenticated) {
    return <Navigate to="/login" />
  }
  return <Outlet />
}

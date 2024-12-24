import { useContext, useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AUTH_CONTEXT_ACTION_TYPE, AuthContext } from "../context/AuthContext"

export function AuthRequired() {
  // State variables
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [error, setError] = useState(false)
  const { dispatch } = useContext(AuthContext)
  // Side Effects Code
  useEffect(() => {
    // Define an async function to verify token for login
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
          dispatch({
            type: AUTH_CONTEXT_ACTION_TYPE.SET_TOKEN,
            payload: { token: token, username: data.username },
          })
        } else {
          setError("Invalid token. Please log in.")
        }
      } catch (error) {
        console.error("Error verifying token:", error.message)
        setError(`Error verifying token: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }
    // Getting token from local storage
    let token = JSON.parse(
      localStorage.getItem("REACT_CHAT_APP_V3_USER_TOKEN")
    )?.token
    // Check if the token is available in the local storage
    if (!token) {
      setLoading(false)
      setError("No token found. Please log in.")
      return
    }
    // Start verifying the token
    verifyToken(token)
  }, [])
  // Let user knows that the token is be verified
  if (loading) {
    return <div>Loading...</div>
  }
  // Redirect to login page if an error appears during token verification
  if (error) {
    return <Navigate to="/login" />
  }
  // Redirect to login page if token is invalid
  if (!authenticated) {
    return <Navigate to="/login" />
  }
  // If nothing is wrong, continue to chat page
  return <Outlet />
}

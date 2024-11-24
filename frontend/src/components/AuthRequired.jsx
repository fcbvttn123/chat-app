import { useContext, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export function AuthRequired() {
  const { token } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  fetch(`${import.meta.env.VITE__BACKEND_URL}/api/auth/verifyToken`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      if (data.status === "Valid Token") {
        setAuthenticated(true)
      }
      setLoading(false)
    })
  if (loading) {
    console.log("loading")
    return <div>Loading...</div>
  } else {
    if (!authenticated) {
      return <Navigate to="/login" />
    }
    return <Outlet />
  }
}

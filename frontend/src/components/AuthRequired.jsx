import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export function AuthRequired() {
  const { token } = useContext(AuthContext)
  let authenticated = token
  if (!authenticated) {
    return <Navigate to="/login" />
  }
  return <Outlet />
}

import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export function AuthRequired() {
  const { token } = useContext(AuthContext)
  console.log(token)
  let authenticated = false
  if (!authenticated) {
    return <Navigate to="/login" />
  }
  return <Outlet />
}

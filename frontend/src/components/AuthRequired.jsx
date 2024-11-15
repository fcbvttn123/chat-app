import { Navigate, Outlet } from "react-router-dom"

export function AuthRequired() {
  let authenticated = false
  if (!authenticated) {
    return <Navigate to="/login" />
  }
  return <Outlet />
}

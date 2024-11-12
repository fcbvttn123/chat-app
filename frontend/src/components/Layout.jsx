import { Outlet } from "react-router-dom"

export function Layout() {
  return (
    <div className="h-screen bg-[#e8e8e8]">
      <Outlet />
    </div>
  )
}

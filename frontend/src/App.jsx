import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { ChatPage } from "./pages/ChatPage"
import { RegisterAccount } from "./pages/RegisterAccount"
import { Login } from "./pages/Login"
import { Layout } from "./components/Layout"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/register-account" element={<RegisterAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/chat-page" replace />} />
          <Route path="/chat-page" element={<ChatPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

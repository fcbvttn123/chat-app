import { Link } from "react-router-dom"
import { Button } from "../components/Button"
import { ContinueIcon } from "../components/ContinueIcon"
import { GoogleIcon } from "../components/GoogleIcon"
import { Separator } from "../components/Separator"
import { TextInput } from "../components/TextInput"
import { useState } from "react"

export function Login() {
  // State Variables
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  // Functions
  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      }
    })
  }
  async function loginFormSubmitted(e) {
    e.preventDefault()
    setIsLoading(true)
    let loginResult = await callLoginAPI(formData.username, formData.password)
    if (loginResult?.error) {
      setError(loginResult.error)
    } else {
      localStorage.setItem(
        "REACT_CHAT_APP_V3_USER_TOKEN",
        JSON.stringify(loginResult)
      )
    }
    setFormData({
      username: "",
      password: "",
    })
    setIsLoading(false)
  }
  function loginWithGoogle() {
    console.log("Login with Google")
  }
  return (
    // This div element is the form container, mainly used to center the form
    // It has full width and height of the parent component (Layout)
    <div className="h-full w-full px-[50px] flex items-center justify-center">
      {/* Form Component */}
      <form
        onSubmit={loginFormSubmitted}
        className="w-full max-w-[600px] p-5 bg-[#d3d3d3] flex flex-col items-start justify-center rounded-md border-2 border-solid border-[#323232] shadow-[4px_4px_#323232] font-mono"
      >
        <h1 className="text-2xl font-extrabold">Welcome,</h1>
        <h2 className="pb-[40px] text-[#666] font-extrabold">
          sign in to continue
        </h2>
        <Button type="button" onClick={loginWithGoogle}>
          <GoogleIcon /> Continue with Google
        </Button>
        <Separator>Or</Separator>
        {error && <p className="mb-[20px] text-red-600">{error}</p>}
        <TextInput
          name="username"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <TextInput
          name="password"
          type="password"
          placeholder="Password"
          customStyle={{ margin: "15px 0 15px 0" }}
          value={formData.password}
          onChange={handleChange}
        />
        <Button type="submit" disabled={isLoading}>
          Continue <ContinueIcon />
        </Button>
        <Separator>Don't have an account?</Separator>
        <Link to="/register-account" className="w-full">
          <Button type="button">Sign Up</Button>
        </Link>
      </form>
    </div>
  )
}

async function callLoginAPI(username, password) {
  let res = await fetch(`${import.meta.env.VITE__BACKEND_URL}/api/auth/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  })
  let json = await res.json()
  return json
}

import { Link } from "react-router-dom"
import { Button } from "../components/Button"
import { Separator } from "../components/Separator"
import { TextInput } from "../components/TextInput"
import { useState } from "react"

export function RegisterAccount() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  return (
    // This div element is the form container, mainly used to center the form
    // It has full width and height of the parent component (Layout)
    <div className="h-full w-full px-[50px] flex items-center justify-center">
      {/* Form Component */}
      <form
        onSubmit={(e) => formSubmitted(e, formData, setFormData)}
        className="w-full max-w-[600px] p-5 bg-[#d3d3d3] flex flex-col items-start justify-center rounded-md border-2 border-solid border-[#323232] shadow-[4px_4px_#323232] font-mono"
      >
        <h1 className="text-2xl font-extrabold">Sign Up!</h1>
        <h2 className="pb-[40px] text-[#666] font-extrabold">
          Please fill out the form below
        </h2>
        <TextInput
          name="username"
          type="text"
          placeholder="Username"
          onChange={(e) => handleChange(e, setFormData)}
          value={formData.username}
        />
        <TextInput
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => handleChange(e, setFormData)}
          value={formData.password}
          customStyle={{ margin: "15px 0 15px 0" }}
        />
        <Button type="submit">Create Account</Button>
        <Separator customStyles={{ marginTop: "40px" }}>
          Already had an account?
        </Separator>
        <Link to="/login" className="w-full">
          <Button type="button">Login</Button>
        </Link>
      </form>
    </div>
  )
}

function formSubmitted(e, formData, setFormData) {
  e.preventDefault()
  console.log(formData)
  setFormData({
    username: "",
    password: "",
  })
}

function handleChange(event, setFormData) {
  const { name, value, type, checked } = event.target
  setFormData((prevFormData) => {
    return {
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }
  })
}

import { Link } from "react-router-dom"
import { Button } from "../components/Button"
import { Separator } from "../components/Separator"
import { TextInput } from "../components/TextInput"

export function RegisterAccount() {
  return (
    // This div element is the form container, mainly used to center the form
    // It has full width and height of the parent component (Layout)
    <div className="h-full w-full px-[50px] flex items-center justify-center">
      {/* Form Component */}
      <form
        onSubmit={formSubmitted}
        className="w-full max-w-[600px] p-5 bg-[#d3d3d3] flex flex-col items-start justify-center rounded-md border-2 border-solid border-[#323232] shadow-[4px_4px_#323232] font-mono"
      >
        <h1 className="text-2xl font-extrabold">Sign Up!</h1>
        <h2 className="pb-[40px] text-[#666] font-extrabold">
          Please fill out the form below
        </h2>
        <TextInput name="username" type="text" placeholder="Username" />
        <TextInput
          name="password"
          type="password"
          placeholder="Password"
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

function formSubmitted(e) {
  e.preventDefault()
  console.log("Create Account event")
}

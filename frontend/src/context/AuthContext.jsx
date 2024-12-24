import { createContext, useReducer } from "react"

export const AUTH_CONTEXT_ACTION_TYPE = {
  SET_TOKEN: "SET_TOKEN",
}

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        token: action?.payload?.token,
        username: action?.payload?.username,
      }
    default:
      return state
  }
}

export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    token: null,
    username: null,
  })
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

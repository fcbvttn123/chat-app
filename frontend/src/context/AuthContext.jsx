import { createContext, useEffect, useReducer } from "react"

export const AUTH_CONTEXT_ACTION_TYPE = {
  SET_TOKEN: "SET_TOKEN",
}

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        token: action.payload,
      }
    default:
      return state
  }
}

export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    token: null,
  })
  useEffect(() => {
    const localStorageData = JSON.parse(
      localStorage.getItem(import.meta.env.VITE__LOCAL_STORAGE_KEY_USER_TOKEN)
    )
    localStorageData?.token &&
      dispatch({ type: "SET_TOKEN", payload: localStorageData.token })
  }, [])
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

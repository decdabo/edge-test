'use client'
import React, { createContext, useContext, useReducer } from "react"
import { AuthContextAction, AuthContextState, AuthContextTypes } from "@/utils/types"


// types required
export type AuthContextStateTypes = {
  state: AuthContextState,
  dispatch: React.Dispatch<AuthContextAction>
}

const initialState: AuthContextState = {
  isAuth: false,
  token: '',
  username: '',
  email: ''
}

//Creating our context
const AuthContext = createContext({} as AuthContextStateTypes)

// Context state handler
const authReducer = (state: AuthContextState, action: AuthContextAction): AuthContextState => {
  switch (action.type) {
    case AuthContextTypes.LOGIN:
      return {
        ...action.payload,
        isAuth: true
      }
    case AuthContextTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

// Provider as a father function component
export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [ state, dispatch ] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook to get our global state easyier
export const useAuthContext = () => useContext(AuthContext);
